class TestServiceImpl implements TestInterface {
  testPrint() {
    console.info('testPrint');
  }
}
globalService.testInterface = new TestServiceImpl();
