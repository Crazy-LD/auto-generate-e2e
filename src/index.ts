import { loadConfiguration, loadSources, runCucumber } from '@cucumber/cucumber/api'
export async function runTests() {
    const result = await loadConfiguration()
    debugger;
    const result2 = await loadSources(result.runConfiguration.sources)
    debugger;
    const result3 = await runCucumber(result.runConfiguration)
    debugger;
    return null;
}
runTests();