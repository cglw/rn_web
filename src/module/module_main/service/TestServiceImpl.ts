class TestServiceImpl implements TestInterface {
  testPrint() {
    console.info('testPrint');
  }
}
console.info('testInterface init');
globalService.testInterface = new TestServiceImpl();
