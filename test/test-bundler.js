import 'babel-polyfill';
import { expect, assert, default as chai } from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';

chai.use(dirtyChai);
const should = chai.should();

global.expect = expect;
global.assert = assert;
global.should = should;
global.chai = chai;
global.sinon = sinon;

// ---------------------------------------
// Require Tests
// ---------------------------------------
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

const testsContext = require.context('../src/', true, /\.spec\.js$/);

// Only run tests that have changed after the first pass
const testsToRun = testsContext.keys().filter(inManifest)
;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

const componentsContext = require.context('../src/', true, /^((?!index).)*\.js$/);
componentsContext.keys().forEach(componentsContext);
