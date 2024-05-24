let knowledgeBase = {};

async function loadKnowledgeBase() {
    const response = await fetch('Knowledge_Base.txt');
    const content = await response.text();
    parseKnowledgeBase(content);
}

function parseKnowledgeBase(content) {
    let sections = content.split('# ').slice(1);
    sections.forEach(section => {
        let lines = section.split('\n');
        let title = lines[0].trim();
        knowledgeBase[title] = lines.slice(1).join('\n').trim();
    });
}

function getResponse() {
    let question = document.getElementById('question').value.toLowerCase();
    let response = "I'm sorry, I don't have an answer for that.";
    if (question.includes('crop')) {
        response = knowledgeBase['Crop Advice'] || response;
    } else if (question.includes('pest')) {
        response = knowledgeBase['Pest Control'] || response;
    } else if (question.includes('weather')) {
        response = knowledgeBase['Weather Information'] || response;
    } else if (question.includes('soil')) {
        response = knowledgeBase['Soil Management'] || response;
    }
    document.getElementById('response').innerText = response;
}

window.onload = loadKnowledgeBase;
