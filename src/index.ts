import { loadConfiguration, runCucumber } from '@cucumber/cucumber/api'
export async function runTests() {
    const configuration = await loadConfiguration({ file: 'cucumber.js' })
    const result = await runCucumber(configuration.runConfiguration);
    if (result.success) {
        console.log('success');
    } else {
        console.log('fail');
    }
}
runTests();