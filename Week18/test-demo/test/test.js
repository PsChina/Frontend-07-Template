var assert = require('assert')
import { add } from '../add.js'

describe('add function testing', function () {
    it('1+2 shuld be 3', function () {
        assert.equal(add(1, 2), 3)
    })


    it('-5+2 shuld be -3', function () {
        assert.equal(add(-5, 2), -3)
    })
})

