// MIT © 2017 azu
"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/textlint-rule-no-insert-dropping-sa");
tester.run("rule", rule, {
    valid: [
        // no problem
        "text",
        "今年はたいそう良いことがあった。",
        "今日は暖かさそう。",
        // ない + そう は許容
        "色々考えましたが一番いいのは食べなさそうな観葉植物にする",
        "一生お金に困らなさそうな人ってどんなイメージの人ですか",
        // どちらもOK 「すまない」と「ない」+「そう」の違い
        "大尉はいかにもすまなさそうに言った",
        "大尉はいかにもすまなそうに言った",
    ],
    invalid: [
        // さ入れ
        {
            text: "早く終わらせて帰りたさそうなのがおかしかった。",
            output: "早く終わらせて帰りたそうなのがおかしかった。",
            errors: [
                {
                    message: "不要な「さ」が挿入されています。",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            text: "薫と巽さんがチョコを食べたさそうにしてたから、仕方なくほんの少しだけ分けてあげたから",
            output: "薫と巽さんがチョコを食べたそうにしてたから、仕方なくほんの少しだけ分けてあげたから",
            errors: [
                {
                    message: "不要な「さ」が挿入されています。",
                    line: 1,
                    column: 14
                }
            ]
        },
        {
            text: "刺し身をたべたさそう。",
            output: "刺し身をたべたそう。",
            errors: [
                {
                    message: "不要な「さ」が挿入されています。",
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            text: "寿司が美味しさそう。",
            output: "寿司が美味しそう。",
            errors: [
                {
                    message: "不要な「さ」が挿入されています。",
                    line: 1,
                    column: 7
                }
            ]
        },
        {
            text: "辛さそうな様子だ。",
            output: "辛そうな様子だ。",
            errors: [
                {
                    message: "不要な「さ」が挿入されています。",
                    line: 1,
                    column: 2
                }
            ]
        },
        // 「サ抜き」
        {
            text: "これは問題無そう。",
            output: "これは問題無さそう。",
            errors: [
                {
                    message: "「さ」が抜けています。",
                    line: 1,
                    column: 6
                }
            ]
        },
        {
            text: "芸術性なんてとても関係無そう。",
            output: "芸術性なんてとても関係無さそう。",
            errors: [
                {
                    message: "「さ」が抜けています。",
                    line: 1,
                    column: 12
                }
            ]
        },
        {
            text: "これは良そう",
            output: "これは良さそう",
            errors: [
                {
                    message: "「さ」が抜けています。",
                    line: 1,
                    column: 4
                }
            ]
        },
    ]
});