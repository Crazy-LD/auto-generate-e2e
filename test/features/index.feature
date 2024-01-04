Feature: 测试例子
  Scenario: 去百度
    # Given jump to [https://demo.playwright.dev/todomvc]
    Given 跳转到['https://demo.playwright.dev/todomvc']
    When 在['输入框']中输入['吃饭']
    When 在['输入框']按下['回车']
    Then ['列表']的文案为['吃饭']

  # Scenario Outline:
  #   Given 跳转到['<url>']
  #   Then  ['class=new-todo']的文案为['<text>']
  #   Examples:
  #     | url                                 | text  |
  #     | https://demo.playwright.dev/todomvc | test  |
  #     | https://demo.playwright.dev/todomvc | test2 |