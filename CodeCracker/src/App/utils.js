function getCode() {
    const code = [];
    for (let i = 0; i < 3; i++) {
    let digit = Math.floor(Math.random()*10);
    while (code.includes(digit)) {
        digit = Math.floor(Math.random()*10);
    }
    code.push(digit);
    }
    return code;
}

function get2CorrectWrongPlaces(code) {
    //// 2 correct #s, wrong places
    const notChosen = Math.floor(Math.random()*code.length);
    const correctIndexes = [0,1,2].filter(i => i !== notChosen);
    const hint = correctIndexes.map(i => {return code[i]});
    let wrong = Math.floor(Math.random()*10);
    while (code.includes(wrong)) {
        wrong = Math.floor(Math.random()*10);
    }
    hint.push(wrong);
    hint.sort(() => Math.random() - 0.5);
    while (hint[0] === code[0] || hint[1] === code[1] || hint[2] === code[2]) {
        hint.sort(() => Math.random() - 0.5);
    }
    return hint;
}

function get1CorrectWrongPlace(code) {
    //// 1 correct #, wrong places
    const chosen = Math.floor(Math.random()*code.length);
    const correct = code[chosen];
    let newIndex = Math.floor(Math.random()*code.length);
    while (newIndex === chosen) {
        newIndex = Math.floor(Math.random()*code.length);
    }
    const newCodePos = [{i: newIndex, value: correct}];
    const newCodeValues = [];
    const newCodeIndexes = [newIndex];
    for (let i = 0; i < 2; i++) {
        let wrong = Math.floor(Math.random()*10);
        while (code.includes(wrong) || newCodeValues.includes(wrong)) {
            wrong = Math.floor(Math.random()*10);
        }
        newCodeValues.push(wrong);
        let wrongIndex = Math.floor(Math.random()*code.length);
        while (newCodeIndexes.includes(wrongIndex)){
            wrongIndex = Math.floor(Math.random()*code.length);
        }
        newCodeIndexes.push(wrongIndex);
        newCodePos.push({i: wrongIndex, value: wrong});
    }
    const newCode = []
    newCodePos.forEach(item => {
        newCode[item.i] = item.value;
    });
    return newCode;
}

function getNothingCorrect(code) {
    const newCode = [];
    for (let i = 0; i < 3; i++) {
        let digit = Math.floor(Math.random()*10);
        while (code.includes(digit) || newCode.includes(digit)) {
            digit = Math.floor(Math.random()*10);
        }
        newCode.push(digit);
    }
    return newCode;
}

function get1CorrectRightPlace(code) {
    //// 1 correct #, right place
    const chosen = Math.floor(Math.random()*code.length);
    const correct = code[chosen];
    const newCodePos = [{i: chosen, value: correct}];
    const newCodeValues = [];
    const newCodeIndexes = [chosen];
    for (let i = 0; i < 2; i++) {
        let wrong = Math.floor(Math.random()*10);
        while (code.includes(wrong) || newCodeValues.includes(wrong)) {
            wrong = Math.floor(Math.random()*10);
        }
        newCodeValues.push(wrong);
        let wrongIndex = Math.floor(Math.random()*code.length);
        while (newCodeIndexes.includes(wrongIndex)){
            wrongIndex = Math.floor(Math.random()*code.length);
        }
        newCodeIndexes.push(wrongIndex);
        newCodePos.push({i: wrongIndex, value: wrong});
    }
    const newCode = []
    newCodePos.forEach(item => {
        newCode[item.i] = item.value;
    });
    return newCode;
}

const codeFuncs = [
    {func: getNothingCorrect, text: 'No Correct #s'},
    {func: get1CorrectRightPlace, text: 'One Correct #, Right Place'},
    {func: get1CorrectWrongPlace, text: 'One Correct #, Wrong Place'},
    {func: get2CorrectWrongPlaces, text: 'Two Correct #s, Wrong Places'},
];

const extraCodeFuncs = codeFuncs.slice(1);

const colors = ['#ff0000', '#00ff00', '#0000ff', '#da0ef5', '#ff7b00']

function easyHints() {
    return [...codeFuncs, {func: getNothingCorrect, text: 'No Correct #s'}]
}

function checkEasy(hints) {
    const noc = hints.filter(item => item.text === 'No Correct #s');
    const firstHint = noc[0].value;
    const secondHint = noc[1].value;
    let numSame = 0;
    for (let i = 0; i < firstHint.length; i++) {
        if(secondHint.includes(firstHint[i])) {
            numSame++;
        }
    }
    return numSame < 2;
}

function normalHints() {
    const extraFunc = extraCodeFuncs[Math.floor(Math.random()*extraCodeFuncs.length)];
    return [...codeFuncs, {func: extraFunc.func, text: extraFunc.text}];
}

function hardHints() {
    const extraFunc1 = extraCodeFuncs[Math.floor(Math.random()*extraCodeFuncs.length)];
    const extraFunc2 = extraCodeFuncs[Math.floor(Math.random()*extraCodeFuncs.length)];
    return [...extraCodeFuncs, {func: extraFunc1.func, text: extraFunc1.text}, {func: extraFunc2.func, text: extraFunc2.text}];
}

function finalizeHints(funcs, code) {
    funcs = funcs.sort(() => Math.random() - 0.5);
    funcs.forEach((item, index) => {
        item.value = item.func(code);
        item.color = colors[index];
        item.lastOne = index === 4;
    });
    return funcs;
}


function getHints(code, mode) {
    let hints = [];
    switch (mode) {
        case 'Easy':
            hints = easyHints();
            break;
        default:
        case 'Normal':
            hints = normalHints();
            break;
        case 'Hard':
            hints = hardHints();
            break;
    }
    hints = finalizeHints(hints, code);
    while (mode === 'Easy' && !checkEasy(hints)) {
        hints = easyHints();
        hints = finalizeHints(hints, code);
    }
    return hints;
}

export { getCode, getHints };