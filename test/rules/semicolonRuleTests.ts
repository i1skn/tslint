/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {RuleFailure, TestUtils} from "../lint";

describe("<semicolon>", () => {
    const SemicolonRule = TestUtils.getRule("semicolon");
    const fileName = "rules/semicolon.test.ts";
    const failureString = SemicolonRule.FAILURE_STRING;
    const createFailure = (start: number[], end: number[]) => {
        return TestUtils.createFailure(fileName, start, end, failureString);
    };
    let actualFailures: RuleFailure[];

    before(() => {
        actualFailures = TestUtils.applyRuleOnFile(fileName, SemicolonRule);
    });

    it("warns on all statements", () => {
        assert.equal(actualFailures.length, 20);
    });

    it("warns on variable statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([1, 10], [1, 10]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([25, 14], [25, 14]));
    });

    it("warns on expression statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([2, 7], [2, 7]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([5, 2], [5, 2]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([7, 19], [7, 19]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([9, 32], [9, 32]));
    });

    it("warns on return statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([12, 11], [12, 11]));
    });

    it("warns on break statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([17, 14], [17, 14]));
    });

    it("warns on continue statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([19, 17], [19, 17]));
    });

    it("warns on throw statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([22, 30], [22, 30]));
    });

    it("warns on do while statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([26, 16], [26, 16]));
    });

    it("warns on debugger statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([28, 9], [28, 9]));
    });

    it("warns on import and export statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([30, 24], [30, 24]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([32, 17], [32, 17]));
    });

    it("warns on use strict statements", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([36, 17], [36, 17]));
    });

    it("warns on property declarations", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([41, 25], [41, 25]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([42, 27], [42, 27]));
    });

    it("warns on interface declaration", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([47, 17], [47, 17]));
        TestUtils.assertContainsFailure(actualFailures, createFailure([48, 16], [48, 16]));
    });

    it("warns on import statement", () => {
        TestUtils.assertContainsFailure(actualFailures, createFailure([54, 34], [54, 34]));
    });
});