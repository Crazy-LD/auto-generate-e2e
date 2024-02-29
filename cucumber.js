const requires = [
  "src/steps/*.ts"
];

if (process.env['executor'] === 'exec') {
  requires.push('src/hooks/hooks.ts');
}
module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: [
      "test/features/"
    ],
    publishQuiet: true,
    dryRun: false,
    require: requires,
    requireModule: [
    ],
    parallel: 1,
  }
}