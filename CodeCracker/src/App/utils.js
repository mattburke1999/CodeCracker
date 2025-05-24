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
    {func: getNothingCorrect, texts: ['No Correct #s']},
    {func: get1CorrectRightPlace, texts: ['One Correct #, Right Place']},
    {func: get1CorrectWrongPlace, texts: ['One Correct #, Wrong Place']},
    {func: get2CorrectWrongPlaces, texts: ['Two Correct #s, Wrong Places']},
];

const extraCodeFuncs = codeFuncs.slice(1);

const colors = ['#ff0000', '#00ff00', '#0000ff', '#da0ef5', '#ff7b00']

function easyHints() {
    return [...codeFuncs, {func: getNothingCorrect, texts: ['No Correct #s']}]
}

function normalHints() {
    const extraFunc = extraCodeFuncs[Math.floor(Math.random()*extraCodeFuncs.length)];
    return [...codeFuncs, {func: extraFunc.func, texts: extraFunc.texts}];
}

function hardHints() {
    const extraFunc1 = extraCodeFuncs[Math.floor(Math.random()*extraCodeFuncs.length)];
    const extraFunc2 = extraCodeFuncs[Math.floor(Math.random()*extraCodeFuncs.length)];
    return [...extraCodeFuncs, {func: extraFunc1.func, texts: extraFunc1.texts}, {func: extraFunc2.func, texts: extraFunc2.texts}];
}

function getHints(code, mode) {
    let funcs = [];
    switch (mode) {
        case 'Easy':
            funcs = easyHints();
            break;
        default:
        case 'Normal':
            funcs = normalHints();
            break;
        case 'Hard':
            funcs = hardHints();
            break;
    }
    funcs = funcs.sort(() => Math.random() - 0.5);
    funcs.forEach((item, index) => {
        item.value = item.func(code);
        item.color = colors[index];
        item.lastOne = index === 4;
    });
    return funcs
}

export { getCode, getHints };