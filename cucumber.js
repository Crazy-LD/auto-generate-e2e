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
    require: [
      "src/steps/*.ts",
      "src/hooks/hooks.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    parallel: 1,
  }
}