const scanner = require('sonarqube-scanner');

const { shaLatestCommit, latestTag, exec } = require('./helpers');

const token = process.env['SONAR_TOKEN'] ?? exec('export $(cat env/.sonar.env | xargs) && echo $SONAR_TOKEN');
const serverUrl =
  process.env['SONAR_SERVER_URL'] ?? exec('export $(cat env/.sonar.env | xargs) && echo $SONAR_SERVER_URL');

scanner(
  {
    serverUrl,
    token,
    options: {
      'sonar.projectName': 'Pets API',
      'sonar.projectVersion': `${latestTag}-${shaLatestCommit}`,
      'sonar.language': 'ts',
      'sonar.projectBaseDir': '.',
      'sonar.sources': 'src',
      'sonar.exclusions': 'src/**/tests/**/*,src/configs/**/*,src/migrations/**/*',
      'sonar.tests': 'src',
      'sonar.test.inclusions': 'src/**/tests/**/*.(spec|test).ts',
      'sonar.typescript.lcov.reportPaths': 'coverage/unit/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/unit/test-reporter.xml',
    },
  },
  process.exit,
);
