import { expect, test } from "bun:test";
import {
	buildFormBody,
	buildQueryString,
	encodeValue,
} from "../transport/serialize.js";

test("encodes arrays as comma-separated list", () => {
	expect(buildQueryString({ children: ["1", "2"], q: "hello" })).toBe(
		"children=1%2C2&q=hello",
	);
});

test("encodes nested objects as JSON", () => {
	expect(buildQueryString({ text_attachment: { plaintext: "x" } })).toBe(
		"text_attachment=%7B%22plaintext%22%3A%22x%22%7D",
	);
});

test("encodes booleans as true/false", () => {
	expect(buildQueryString({ reverse: true, hide: false })).toBe(
		"reverse=true&hide=false",
	);
});

test("skips undefined and null values", () => {
	expect(buildQueryString({ a: undefined, b: null, c: 1 })).toBe("c=1");
});

test("form body uses urlencoded shape", () => {
	const body = buildFormBody({ creation_id: "abc", hide: true });
	expect(body.get("creation_id")).toBe("abc");
	expect(body.get("hide")).toBe("true");
});

test("encodeValue leaves strings and numbers as-is", () => {
	expect(encodeValue("text")).toBe("text");
	expect(encodeValue(42)).toBe("42");
});
