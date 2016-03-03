'format cjs';

var emoji = require('node-emoji');

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = {

  // When a user runs `git cz`, prompter will
  // be executed. We pass you cz, which currently
  // is just an instance of inquirer.js. Using
  // this you can ask questions and get answers.
  //
  // The commit callback should be executed when
  // you're ready to send back a commit template
  // to git.
  //
  // By default, we'll de-indent your commit
  // template and will keep empty lines.
  prompter: function(cz, commit) {
    console.log('\n' + emoji.emojify(':book:')
     + '  Line 1 will be cropped at 100 characters.\n');

    // Let's ask some questions of the user
    // so that we can populate our commit
    // template.
    //
    // See inquirer.js docs for specifics.
    // You can also opt to use another input
    // collection library if you prefer.
    cz.prompt([
      {
        type: 'input',
        name: 'issue',
        message: 'Enter the GitHub Issue or Jira Story (#789, TRACK-123, etc.):\n',
      },
      {
        type: 'list',
        name: 'emoji',
        message: 'Does one of these apply?',
        choices: [
        {
          name: 'Nope',
          value: 'none',
        },
        {
          name: emoji.emojify(':art:') + '   improving the format/structure of the code',
          value: ':art:',
        },
        {
          name: emoji.emojify(':racehorse:') + '   improving performance',
          value: ':racehorse:',
        },
        {
          name: emoji.emojify(':non-potable_water:')  + '  plugging memory leaks',
          value: ':non-',
        },
        {
          name: emoji.emojify(':memo:') + '   writing docs',
          value: ':memo:',
        },
        {
          name: emoji.emojify(':penguin:') + '   fixing something on Linux',
          value: ':penguin:',
        },
        {
          name: emoji.emojify(':apple:') + '   fixing something on Mac OS',
          value: ':apple:',
        },
        {
          name: emoji.emojify(':checkered_flag:') + '   fixing something on Windows',
          value: ':checkered_flag:',
        },
        {
          name: emoji.emojify(':bug:') + '   fixing a bug',
          value: ':bug:',
        },
        {
          name: emoji.emojify(':fire:') + '   removing code or files',
          value: ':fire:',
        },
        {
          name: emoji.emojify(':green_heart:') + '   fixing the CI build',
          value: ':green_heart:',
        },
        {
          name: emoji.emojify(':white_check_mark:') + '   adding tests',
          value: ':white_check_mark:',
        },
        {
          name: emoji.emojify(':lock:') + '   dealing with security',
          value: ':lock:',
        },
        {
          name: emoji.emojify(':arrow_up:') + '   upgrading dependencies',
          value: ':arrow_up:',
        },
        {
          name: emoji.emojify(':arrow_down:') + '   downgrading dependencies',
          value: ':arrow_down:',
        },
        {
          name: emoji.emojify(':shirt:') + '   removing linter warnings',
          value: ':shirt:',
        },],
      }, {
        type: 'list',
        name: 'type',
        message: 'Select the type of change that you\'re committing:',
        choices: [
        {
          name: 'feat:     A new feature',
          value: 'feat',
        }, {
          name: 'fix:      A bug fix',
          value: 'fix',
        }, {
          name: 'docs:     Documentation only changes',
          value: 'docs',
        }, {
          name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
          value: 'style',
        }, {
          name: 'refactor: A code change that neither fixes a bug or adds a feature',
          value: 'refactor',
        }, {
          name: 'perf:     A code change that improves performance',
          value: 'perf',
        }, {
          name: 'test:     Adding missing tests',
          value: 'test',
        }, {
          name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
          value: 'chore',
        },],
      }, {
        type: 'input',
        name: 'scope',
        message: 'Denote the scope of this change (PDP, Facets, Navigation, etc.):\n',
      }, {
        type: 'input',
        name: 'subject',
        message: 'Write a short, imperative tense description of the change:\n',
      }, {
        type: 'input',
        name: 'body',
        message: 'Provide a longer description of the change:\n',
      }, {
        type: 'input',
        name: 'footer',
        message: 'List any breaking changes or issues closed by this change:\n',
      },
    ], function(answers) {
      var maxLineWidth = 100;

      // Parentheses are only needed when a scope is present
      var issue = answers.issue ? answers.issue.trim() + ': ' : '';
      var emoji = answers.emoji !== 'none' ? answers.emoji.trim() + ' ' : '';

      var scope = answers.scope.trim();
      scope = scope ? ' (' + answers.scope.trim() + ')' : '';

      // Hard limit this line
      var head = (issue + emoji + answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

      commit(head + '\n\n' + answers.body + '\n\n' + answers.footer);
    });
  },
}
