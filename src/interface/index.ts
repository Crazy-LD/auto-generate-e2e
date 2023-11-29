export interface Scenario {
    name: string;
    steps: Step[]
}

export interface Step {
    /** 指令 */
    command: Command,
    /** 参数 */
    params: (string | number)[]
}


/** 指令 */
export enum Command {
    /** 跳转链接 */
    Jump = 'jump',
    /** 等待 */
    Wait = 'wait',
    /** 存在元素 */
    ExistElement = 'existElement',
    /** 存在文案 */
    ExistText = 'existText',
    /** 点击元素 */
    ClickElement = 'clickElement',
    /** 点击文案 */
    ClickText = 'clickText',
    /** 点击位置 */
    ClickPosition = 'clickPosition',
    /** 在placeholder中输入文字 */
    InputText = 'inputText',
    /** 元素的文案是 */
    ElementTextIs = 'elementTextIs',
    /** 按下 */
    Press = 'press'
}