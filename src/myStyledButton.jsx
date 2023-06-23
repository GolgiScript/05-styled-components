import React from 'react';

const globalClasses = {};

function findStyleNode(target) {
  const { childNodes } = target;

  for (let i = 0; i < childNodes.length; i++) {
    const child = childNodes[i];
    if (child.tagName === 'STYLE') return child;
  }

  return undefined;
};

function insertStyleNode() {
  const headNode = window.document.head;
  let styleNode = findStyleNode(headNode);

  if (!styleNode) {
    styleNode = window.document.createElement('style');
    headNode.insertBefore(styleNode, null);
  }

  return styleNode;
}

function interleave(strings, interpolations) {
  const result = [strings[0]];

  for (let i = 0; i < interpolations.length; i += 1) {
    result.push(interpolations[i], strings[i + 1]);
  }

  return result;
}

function generateCssBody(rules, props) {
  let cssBody = '';

  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    
    if (typeof rule === 'function') {
      cssBody += rule(props);
    } else {
      cssBody += rule;
    }
  }

  return cssBody;
}

function insertClass(styleNode, cssBody) {
  const className = btoa(cssBody).replace(/[^a-z0-9]+/g, '');

  if (globalClasses[className]) {
    return className;
  }

  const css = `.${className} {${cssBody}}`;
  const textNode = window.document.createTextNode(css);
  styleNode.insertBefore(textNode, null);

  globalClasses[className] = true;

  return className;
}

function myStyledButton(strings, ...interpolations) {
  const rules = interleave(strings, interpolations);

  function wrappedButton(props) {
    const styleNode = insertStyleNode();
    const css = generateCssBody(rules, props)
    const className = insertClass(styleNode, css);

    return <button className={className} onClick={props.onClick}>{props.children}</button>
  }

  return wrappedButton;
}

export default myStyledButton;
