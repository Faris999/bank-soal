"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.css");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            answerShown: false,
            question: "Apa itu A?",
            answers: [
                { answerText: 'a', isCorrect: true, isClicked: false },
                { answerText: 'b', isCorrect: false, isClicked: false },
                { answerText: 'c', isCorrect: false, isClicked: false },
                { answerText: 'd', isCorrect: false, isClicked: false }
            ]
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    App.prototype.handleClick = function (answer) {
        var _this = this;
        console.log('a');
        return function () {
            _this.setState(function (state) {
                if (!state.answerShown) {
                    state.answers.forEach(function (part, index, arr) {
                        if (part.answerText === answer.answerText) {
                            arr[index].isClicked = true;
                        }
                    });
                    return { answers: state.answers, answerShown: true };
                }
            });
        };
    };
    App.prototype.showCorrectAnswer = function () {
        this.setState({ answerShown: true });
    };
    App.prototype.getClassName = function (answer) {
        if (this.state.answerShown) {
            if (answer.isCorrect) {
                return 'correct';
            }
            else if (answer.isClicked) {
                return answer.isCorrect ? 'correct' : 'wrong';
            }
        }
        return '';
    };
    App.prototype.render = function () {
        var _this = this;
        return (<main className="App">
        <p>{this.state.question}</p>
        <ul>
          {this.state.answers.map(function (answer) { return (<li key={answer.answerText} className={_this.getClassName(answer)} onClick={_this.handleClick(answer)}>{answer.answerText}</li>); })}
        </ul>

      </main>);
    };
    return App;
}(react_1.default.Component));
exports.default = App;
//# sourceMappingURL=App.js.map