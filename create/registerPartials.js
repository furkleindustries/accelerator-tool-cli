import {
  readFile,
} from 'fs-extra';
import glob from 'glob';
import {
  registerPartial,
} from 'handlebars';
import {
  basename,
  join,
} from 'path';

export const registerPartials = (directory) => (
  new Promise((resolve, reject) => glob(
    join(directory, 'templates', '*.hbs'),
    async (err, matches) => {
      if (err) {
        return reject(err);
      }

      const basenames = matches
        .map((aa) => basename(aa))
        .filter((aa) => aa !== 'index.hbs');

      let files;
      try {
        files = await Promise.all(
          basenames.map((path) => readFile(path, 'utf8')),
        );
      } catch (err) {
        return reject(err);
      }

      files.forEach((content, index) => (
        registerPartial(basenames[index], content)
      ))

      return resolve();
    }),
  )
);
