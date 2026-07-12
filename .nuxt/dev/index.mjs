import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getResponseStatusText } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import crypto$1 from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/@vue+shared@3.5.39/node_modules/@vue/shared/dist/shared.cjs.js';
import viteNodeEntry_mjs from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/@nuxt+vite-builder@4.4.8_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@types+nod_0acaff1045daa13aed9377289454e2a7/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/@nuxt+vite-builder@4.4.8_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@types+nod_0acaff1045daa13aed9377289454e2a7/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import { promises, readFileSync } from 'node:fs';
import { Resvg } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/@resvg+resvg-js@2.6.2/node_modules/@resvg/resvg-js/index.js';
import { execSync } from 'node:child_process';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/vue-bundle-renderer@2.3.1/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, encodePath, joinRelativeURL } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, defineDriver, prefixStorage } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_ioredis@5.11.1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_ioredis@5.11.1/node_modules/unstorage/drivers/fs.mjs';
import fsDriver from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_ioredis@5.11.1/node_modules/unstorage/drivers/fs-lite.mjs';
import lruCache from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_ioredis@5.11.1/node_modules/unstorage/drivers/lru-cache.mjs';
import { digest, hash as hash$1 } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/youch@4.1.1/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/errx@0.1.0/node_modules/errx/dist/index.js';
import { isVNode, isRef, toValue } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/index.mjs';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/@nuxt+vite-builder@4.4.8_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.7__@types+nod_0acaff1045daa13aed9377289454e2a7/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unhead@2.1.15/node_modules/unhead/dist/server.mjs';
import { renderToString } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/vue@3.5.39_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/unhead@2.1.15/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/mohamedmostafa/Documents/portfoilo/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

// @ts-check


/**
 * @param {string} item
 */
function normalizeFsKey (item) {
  const safe = item.replace(/[^\w.-]/g, '_');
  const prefix = safe.slice(0, 20);
  const hash = crypto$1.createHash('sha256').update(item).digest('hex');
  return `${prefix}-${hash}`
}

const _47Users_47mohamedmostafa_47Documents_47portfoilo_47node_modules_47_46pnpm_47_64nuxt_43nitro_45server_644_464_468__64babel_43plugin_45syntax_45typescript_647_4629_467__64babel_43core_647_4629_467__db0_beac5d88280a794e802a25135dce747a_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js = defineDriver(
  /**
   * @param {{ base?: string }} opts
   */
  (opts) => {
    const fs = fsDriver({ base: opts.base });
    const lru = lruCache({ max: 1000 });

    return {
      ...fs, // fall back to file system - only the bottom three methods are used in renderer
      async setItem (key, value, opts) {
        await Promise.all([
          fs.setItem?.(normalizeFsKey(key), value, opts),
          lru.setItem?.(key, value, opts),
        ]);
      },
      async hasItem (key, opts) {
        return await lru.hasItem(key, opts) || await fs.hasItem(normalizeFsKey(key), opts)
      },
      async getItem (key, opts) {
        return await lru.getItem(key, opts) || await fs.getItem(normalizeFsKey(key), opts)
      },
    }
  },
);

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/mohamedmostafa/Documents/portfoilo","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/mohamedmostafa/Documents/portfoilo/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', _47Users_47mohamedmostafa_47Documents_47portfoilo_47node_modules_47_46pnpm_47_64nuxt_43nitro_45server_644_464_468__64babel_43plugin_45syntax_45typescript_647_4629_467__64babel_43core_647_4629_467__db0_beac5d88280a794e802a25135dce747a_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"/Users/mohamedmostafa/Documents/portfoilo/node_modules/.pnpm/@nuxt+nitro-server@4.4.8_@babel+plugin-syntax-typescript@7.29.7_@babel+core@7.29.7__db0_beac5d88280a794e802a25135dce747a/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"/Users/mohamedmostafa/Documents/portfoilo/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/mohamedmostafa/Documents/portfoilo/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/mohamedmostafa/Documents/portfoilo/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/mohamedmostafa/Documents/portfoilo/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/": {
        "prerender": true
      },
      "/projects": {
        "prerender": true
      },
      "/blogs": {
        "prerender": true
      },
      "/resume": {
        "prerender": true
      },
      "/sitemap.xml": {
        "prerender": true
      },
      "/rss.xml": {
        "prerender": true
      },
      "/projects/lesoll": {
        "prerender": true
      },
      "/projects/egystay": {
        "prerender": true
      },
      "/projects/srvj": {
        "prerender": true
      },
      "/blogs/aws-ec2-s3-kubernetes-production-deployments": {
        "prerender": true
      },
      "/blogs/crdts-yjs-collaborative-editing-srvj": {
        "prerender": true
      },
      "/blogs/server-sent-events-real-time-notifications-srvj": {
        "prerender": true
      },
      "/blogs/paymob-amazon-payment-services-integration": {
        "prerender": true
      },
      "/blogs/jwt-vs-paseto-tokens": {
        "prerender": true
      },
      "/og/page-home.png": {
        "prerender": true
      },
      "/og/page-projects.png": {
        "prerender": true
      },
      "/og/page-blogs.png": {
        "prerender": true
      },
      "/og/page-resume.png": {
        "prerender": true
      },
      "/og/project-lesoll.png": {
        "prerender": true
      },
      "/og/project-egystay.png": {
        "prerender": true
      },
      "/og/project-srvj.png": {
        "prerender": true
      },
      "/og/blog-aws-ec2-s3-kubernetes-production-deployments.png": {
        "prerender": true
      },
      "/og/blog-crdts-yjs-collaborative-editing-srvj.png": {
        "prerender": true
      },
      "/og/blog-server-sent-events-real-time-notifications-srvj.png": {
        "prerender": true
      },
      "/og/blog-paymob-amazon-payment-services-integration.png": {
        "prerender": true
      },
      "/og/blog-jwt-vs-paseto-tokens.png": {
        "prerender": true
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/projects/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/blogs/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/resume/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/sitemap.xml/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/rss.xml/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/projects/lesoll/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/projects/egystay/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/projects/srvj/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/blogs/aws-ec2-s3-kubernetes-production-deployments/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/blogs/crdts-yjs-collaborative-editing-srvj/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/blogs/server-sent-events-real-time-notifications-srvj/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/blogs/paymob-amazon-payment-services-integration/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/blogs/jwt-vs-paseto-tokens/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/page-home.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/page-projects.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/page-blogs.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/page-resume.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/project-lesoll.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/project-egystay.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/project-srvj.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/blog-aws-ec2-s3-kubernetes-production-deployments.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/blog-crdts-yjs-collaborative-editing-srvj.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/blog-server-sent-events-real-time-notifications-srvj.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/blog-paymob-amazon-payment-services-integration.png/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/og/blog-jwt-vs-paseto-tokens.png/_payload.json": {
        "ssr": true,
        "prerender": true
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _yL2xADvqbQE75c0zChaJkmcfZnTBRYUBpN4FEqJR34 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/Users/mohamedmostafa/Documents/portfoilo";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0"},{"name":"theme-color","content":"#faf9f5","media":"(prefers-color-scheme: light)"},{"name":"theme-color","content":"#141413","media":"(prefers-color-scheme: dark)"}],"link":[{"rel":"icon","href":"/favicon.svg","type":"image/svg+xml"},{"rel":"icon","href":"/favicon.ico","type":"image/x-icon","sizes":"48x48"},{"rel":"apple-touch-icon","href":"/apple-touch-icon.png","sizes":"180x180"},{"rel":"manifest","href":"/manifest.json"},{"rel":"alternate","type":"application/rss+xml","title":"Blog • Mohammed Mostafa","href":"/rss.xml"},{"rel":"preload","as":"font","type":"font/woff2","href":"/fonts/alexandria-latin.woff2","crossorigin":""}],"style":[],"script":[{"innerHTML":"(function(){try{var mode=localStorage.getItem('theme-mode');var dark=mode==='dark'||(mode!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark)}catch(e){}})()","tagPosition":"head","tagPriority":"critical"}],"noscript":[],"htmlAttrs":{"lang":"en"}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _kYVl8RfhCAxpqLbuvLtrkgkyu2bxRIG10L2Ot1CWLoI = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _yL2xADvqbQE75c0zChaJkmcfZnTBRYUBpN4FEqJR34,
_kYVl8RfhCAxpqLbuvLtrkgkyu2bxRIG10L2Ot1CWLoI,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e8bf-zSQ8nUnIk2/mno8mhgpnf+q7bVM\"",
    "mtime": "2026-07-12T11:18:12.672Z",
    "size": 256191,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"110e7f-rlwiettFNZUriFHnwH56B9eetEk\"",
    "mtime": "2026-07-12T11:18:12.674Z",
    "size": 1117823,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _LRZcl4 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function filterIslandProps(props) {
  if (!props) {
    return {};
  }
  const out = {};
  for (const key in props) {
    if (!key.startsWith("data-v-")) {
      out[key] = props[key];
    }
  }
  return out;
}
function computeIslandHash(name, filteredProps, context, source) {
  return hash$1([name, filteredProps, context, source]).replace(/[-_]/g, "");
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") {
			return {};
		}
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) {
			throw createError({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});
		}
		return returnIslandResponse(event, response);
	}
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) {
		setResponseHeader(event, header, response.headers[header]);
	}
	if (response.statusCode) {
		setResponseStatus(event, response.statusCode, response.statusMessage);
	}
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const rawProps = destr$1(rawContext?.props) || {};
	const filteredProps = filterIslandProps(rawProps);
	
	
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) {
			if (key !== "props") {
				clientContext[key] = rawContext[key];
			}
		}
	}
	
	
	const expectedHash = computeIslandHash(componentName, filteredProps, clientContext, undefined);
	if (!hashId || hashId !== expectedHash) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request hash"
		});
	}
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: rawProps,
		slots: {},
		components: {}
	};
}

const _lazy_E9YeG7 = () => Promise.resolve().then(function () { return _name_$1; });
const _lazy_i73Nqk = () => Promise.resolve().then(function () { return rss_xml$1; });
const _lazy_FknV52 = () => Promise.resolve().then(function () { return sitemap_xml$1; });
const _lazy_ztOXg8 = () => Promise.resolve().then(function () { return renderer; });

const handlers = [
  { route: '', handler: _LRZcl4, lazy: false, middleware: true, method: undefined },
  { route: '/og/:name', handler: _lazy_E9YeG7, lazy: true, middleware: false, method: undefined },
  { route: '/rss.xml', handler: _lazy_i73Nqk, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _lazy_FknV52, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_ztOXg8, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_ztOXg8, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = crypto$1.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const caseStudies = [
  {
    slug: "lesoll",
    logo: "/projects/lesoll-logo.png",
    name: "Lesoll",
    subtitle: "Real-Estate Marketplace Backend",
    category: "Production",
    summary: "Backend of a large-scale real-estate classifieds marketplace serving real users in the Egyptian market.",
    role: "Backend Engineer \u2014 primary, 100% of the backend implementation",
    timeline: "Jun 2023 \u2014 Jul 2026",
    stack: [
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Paymob",
      "AWS",
      "Docker",
      "NGINX"
    ],
    link: "https://lesoll.com",
    overview: [
      "Lesoll is a large-scale classifieds marketplace for the Egyptian real-estate market. Users buy, sell, and rent residential, commercial, land, and compound properties; the platform also carries premium listing packages, real-time messaging, a blog, and a complete internal administration system.",
      "The business goal is straightforward: connect property owners and seekers directly, and monetize through premium listing packages \u2014 which makes the listing lifecycle, search, and payments the load-bearing parts of the backend.",
      "As the Backend Engineer I owned the backend implementation end to end: REST APIs, business logic, database architecture, third-party integrations, and performance work \u2014 across the listing lifecycle, authentication, payments, notifications, search, analytics, and internal admin services, on a production platform with real users, where mistakes are visible."
    ],
    challenges: [
      {
        title: "Search at scale",
        body: "Thousands of listings behind dozens of combinable filters, and users who expect results in a few hundred milliseconds."
      },
      {
        title: "Media reliability",
        body: "Listings are created with multiple images. When an upload fails silently, the listing goes live incomplete."
      },
      {
        title: "Subscription lifecycle",
        body: "Package purchases, feature activation, renewals, and expiration all mutate paid state \u2014 none of it may ever land in an inconsistent state."
      },
      {
        title: "Ranking with premium features",
        body: "The feed has to surface the most valuable listings while pinned, paid listings keep the exposure they were promised."
      },
      {
        title: "SEO for dynamic pages",
        body: "A large, constantly changing set of listing pages has to stay crawlable and indexable."
      },
      {
        title: "Analytics without slowdown",
        body: "The business needs user-behavior data \u2014 visits, calls, WhatsApp clicks, favorites, shares \u2014 without the tracking weighing down hot request paths."
      },
      {
        title: "Growth",
        body: "Database size and traffic keep growing; queries that were fine at launch degrade over time."
      }
    ],
    built: [
      {
        title: "Search and filtering engine",
        problem: "Search is the product\u2019s front door: thousands of listings, dozens of filters, and an expectation of results in a few hundred milliseconds.",
        approach: "Do the work inside the database, once \u2014 and cache whatever stays expensive.",
        implementation: "Optimized MongoDB aggregation pipelines shaped around compound indexes, with unnecessary lookup stages removed rather than tuned, and caching in front of the queries that remained expensive.",
        outcome: "Faster search responses and lower database load."
      },
      {
        title: "Payment and subscription system (Paymob)",
        problem: "Premium listing packages are the platform\u2019s revenue. Purchases, feature activation, renewals, and expiration all mutate paid state, and an inconsistency here is a direct money problem.",
        approach: "Verify money first, activate features second \u2014 and let jobs, not humans, handle time-based transitions.",
        implementation: "Paymob integration with payment verification before any package activates, protection against duplicate gateway callbacks, transactional backend logic around subscription state changes, and automated expiration jobs.",
        outcome: "A stable subscription lifecycle and noticeably less manual support intervention."
      },
      {
        title: "Image upload pipeline",
        problem: "Multi-image uploads occasionally failed, and listings were created incomplete.",
        implementation: "Reworked the upload pipeline: validation before anything is saved, retry and error handling around the uploads, and image processing moved off the blocking request path.",
        outcome: "More reliable uploads and fewer failed listing creations."
      },
      {
        title: "Advertisement ranking",
        problem: "Show users the most valuable listings while premium features \u2014 like pinning \u2014 keep their promised exposure.",
        implementation: "A ranking strategy combining pin priority, freshness, listing status, and business rules.",
        outcome: "Fair exposure for premium listings without degrading the browsing experience."
      },
      {
        title: "Real-time chat system",
        problem: "Buyers and sellers need to negotiate about a listing inside the platform, in real time, without dropping to phone calls or external messengers.",
        implementation: "A real-time messaging system built on Socket.IO, carrying conversations between users on the production platform."
      },
      {
        title: "Co-host system",
        implementation: "A co-host system that lets property owners delegate management of their listings to other accounts."
      },
      {
        title: "SEO backend",
        problem: "A large and constantly changing set of dynamic listing pages has to be crawlable.",
        implementation: "Dynamic sitemap generation, canonical URL generation, structured metadata APIs, and optimized URL construction.",
        outcome: "Better indexing and search visibility."
      },
      {
        title: "Analytics and tracking",
        problem: "Understand user behavior without the tracking itself affecting performance.",
        implementation: "Event tracking for page visits and listing interactions \u2014 WhatsApp clicks, calls, favorites, shares \u2014 aggregated into statistics for internal dashboards."
      }
    ],
    incidents: [],
    decisions: [],
    performance: [
      {
        title: "Indexes and aggregation",
        body: "Search and listing queries run through MongoDB aggregation pipelines shaped around compound indexes. Unnecessary lookup stages were removed instead of tuned \u2014 the fastest pipeline stage is the one that no longer exists."
      },
      {
        title: "Caching",
        body: "Expensive, frequently repeated queries are cached, cutting repeated database calls on hot paths and lowering overall database load."
      },
      {
        title: "Non-blocking media processing",
        body: "Image processing runs off the request path, so uploads no longer block API responses."
      }
    ],
    security: [],
    lessons: [],
    result: [],
    metaTitle: "Lesoll Deep Dive \u2022 Real-Estate Marketplace Backend",
    metaDescription: "How I built Lesoll\u2019s production real-estate marketplace backend: MongoDB search at scale, Paymob payments and subscriptions, Socket.IO chat, and BullMQ jobs.",
    datePublished: "2026-07-09",
    relatedBlogSlugs: ["paymob-amazon-payment-services-integration"],
    keywords: [
      "Lesoll",
      "Backend Engineering",
      "Software Architecture",
      "Distributed Systems",
      "Real-Time Systems",
      "Cloud Computing",
      "System Design",
      "Node.js",
      "TypeScript",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "NGINX",
      "Payment Gateway Integration",
      "Real-Time Collaboration",
      "CRDT",
      "Yjs",
      "Server-Sent Events",
      "WebSockets",
      "PASETO",
      "Authentication",
      "Authorization",
      "RBAC",
      "Caching",
      "Background Job Processing",
      "Message Queues",
      "Performance Optimization",
      "Scalable Backend Systems"
    ]
  },
  {
    slug: "egystay",
    logo: "/projects/egy-stay-logo.png",
    name: "EGYStay",
    subtitle: "Booking Platform Backend",
    category: "Production",
    summary: "Booking and reservation backend for a short-term rental platform, built from the ground up.",
    role: "Backend Engineer \u2014 primary, ~80% of the implementation (1100 of 1300 commits)",
    stack: [
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Amazon Payment Services",
      "Paymob",
      "AWS",
      "Docker"
    ],
    link: "https://egystay.com",
    overview: [
      "EGYStay is a short-term rental platform for the Egyptian market. Guests book accommodations; hosts and co-hosts manage their properties through dedicated dashboards. Reservations, availability, and pricing are the core of the product \u2014 if any of them is wrong, someone loses money or a place to stay.",
      "I architected and developed the backend from the ground up: reservation workflows, availability management, pricing logic, payments, authentication, messaging, notifications, and administrative services.",
      "I contributed roughly 80% of the implementation \u2014 around 63,000 lines of production code across 600+ source files \u2014 with maintainability and performance as explicit goals rather than afterthoughts."
    ],
    challenges: [
      {
        title: "Reservation conflicts",
        body: "Two guests must never book the same property for the same nights \u2014 even when they try at the same moment."
      },
      {
        title: "Calendar consistency",
        body: "Property availability has to stay synchronized after every booking and cancellation."
      },
      {
        title: "Pricing complexity",
        body: "A total price depends on nights, cleaning fee, service fee, discounts, taxes, and promotions \u2014 and must come out identical everywhere it is computed."
      },
      {
        title: "Search",
        body: "Filtering by city, dates, guests, price, amenities, and property type, with responses that stay fast."
      },
      {
        title: "Instant updates",
        body: "Guests and hosts need to hear about booking events as they happen."
      },
      {
        title: "Booking integrity",
        body: "Only valid bookings may ever reach payment."
      },
      {
        title: "Operations",
        body: "Listings, reservations, users, and reports need efficient day-to-day administrative management."
      }
    ],
    built: [
      {
        title: "Booking system",
        problem: "A booking is only correct when availability, pricing, and reservation state agree \u2014 including when two guests race for the same nights.",
        approach: "Validate on the server, and make the final booking write atomic so a race cannot produce two winners.",
        implementation: "Backend availability validation with overlapping-reservation checks, booking creation protected by atomic database operations, and availability calculation logic that updates automatically on bookings and cancellations.",
        outcome: "Double bookings were eliminated."
      },
      {
        title: "Pricing engine",
        problem: "The total price of a stay depends on nights, cleaning fee, service fee, discounts, taxes, and promotions \u2014 computed in more than one place, it will eventually disagree with itself.",
        approach: "One implementation of the math, used everywhere.",
        implementation: "Pricing calculations centralized in a reusable service, with every calculation validated on the server \u2014 never trusted from the client."
      },
      {
        title: "Payment system (Amazon Payment Services + Paymob)",
        problem: "Real money moves on every reservation, so payment state has to stay consistent with booking state.",
        implementation: "A payment system integrating two gateways \u2014 Amazon Payment Services and Paymob \u2014 covering payment initiation, gateway callbacks, and payment state tracking for reservations."
      },
      {
        title: "Property search",
        problem: "Search spans city, dates, guests, price, amenities, and property type \u2014 and still has to answer fast.",
        implementation: "Optimized filtering queries over indexes on the frequently searched fields, with unnecessary database work stripped out of the hot path."
      },
      {
        title: "Real-time chat system",
        problem: "Guests and hosts need to communicate about a stay inside the platform, in real time.",
        implementation: "A real-time messaging system built on Socket.IO."
      },
      {
        title: "Notifications",
        problem: "Guests and hosts need instant updates when a booking changes state.",
        implementation: "Booking events trigger notifications; confirmations and status changes are processed asynchronously, so delivery never blocks the booking flow."
      },
      {
        title: "Co-host system",
        implementation: "Hosts can delegate property management to co-hosts, who operate through dedicated dashboards."
      },
      {
        title: "Admin platform",
        problem: "Listings, reservations, users, and reports need efficient day-to-day management.",
        implementation: "Administrative APIs with dashboards and reporting endpoints, gated by role-based authorization."
      }
    ],
    incidents: [],
    decisions: [],
    performance: [
      {
        title: "Search indexes",
        body: "Frequently searched fields are indexed, and the filtering queries are shaped around those indexes."
      },
      {
        title: "Less database work",
        body: "Unnecessary database work was stripped out of request paths rather than optimized in place."
      },
      {
        title: "Async processing",
        body: "Booking confirmations, status changes, and notification delivery run asynchronously, off the request path."
      }
    ],
    security: [
      {
        title: "Secure booking flow",
        body: "Server-side validation, ownership checks, and availability verification all run before a booking is allowed to reach payment."
      },
      {
        title: "Role-based authorization",
        body: "Administrative APIs and dashboards are gated by role-based authorization."
      }
    ],
    lessons: [],
    result: [],
    metaTitle: "EGYStay Deep Dive \u2022 Booking Platform Backend",
    metaDescription: "How I built EGYStay\u2019s booking backend: atomic reservations with zero double bookings, a centralized pricing engine, and APS + Paymob payments.",
    datePublished: "2026-07-09",
    relatedBlogSlugs: ["paymob-amazon-payment-services-integration"],
    keywords: [
      "EGYStay",
      "EGYStay Booking Platform",
      "Property Rental Platform",
      "Vacation Rental Platform",
      "Property Booking System",
      "Hotel Booking Alternative",
      "Short-Term Rental Platform",
      "Rental Marketplace",
      "Booking Engine",
      "Reservation System",
      "Co-Host Management",
      "Property Management",
      "Cancellation Policy",
      "Marketplace Backend",
      "Booking Platform Backend",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Modular Monolith Architecture",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Amazon Payment Services",
      "APS Payment Gateway",
      "Payment Gateway Integration",
      "OTP Authentication",
      "SMS Verification",
      "Email Notifications",
      "Real-time Chat",
      "Socket.IO",
      "Admin Dashboard",
      "Host Dashboard",
      "User Dashboard",
      "Notification System",
      "Background Jobs",
      "Puppeteer Web Scraping",
      "Docker",
      "NGINX",
      "AWS EC2",
      "AWS EKS",
      "AWS S3",
      "AWS CloudFront",
      "AWS Route 53",
      "AWS SQS",
      "GitHub Actions",
      "CI/CD",
      "REST API",
      "Scalable Backend",
      "Production Backend",
      "Cloud Deployment"
    ]
  },
  {
    slug: "srvj",
    logo: "/projects/srvj.png",
    name: "SRVJ",
    subtitle: "Real-Time CRDT Collaboration Backend",
    category: "Real-time",
    summary: "A real-time collaborative diagram editor: CRDT synchronization, presence, and persistence built from protocol level up.",
    role: "Solo \u2022 design and implementation, backend and frontend",
    stack: [
      "TypeScript",
      "Express.js",
      "Yjs (CRDTs)",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Docker",
      "Vue.js"
    ],
    link: "https://srvj.elrefai.me/",
    overview: [
      "SRVJ is a collaborative diagram editor where multiple people edit the same board at the same time \u2014 live cursors, presence, and conflict-free merging of concurrent edits. The interesting work is invisible: keeping every client convergent without a central lock, and persisting a document that is technically a binary CRDT state.",
      "I built it solo, end to end: the synchronization server, authentication and access control, the persistence layer, notifications, background processing, and the Vue frontend. The goal was to understand real-time collaboration infrastructure by building it from the protocol level up, not by wrapping a hosted service."
    ],
    challenges: [],
    built: [
      {
        title: "CRDT synchronization server",
        problem: 'Concurrent edits from multiple clients must converge to the same document without locking or a "last write wins" data loss.',
        approach: "Yjs CRDTs carry the conflict resolution; the server\u2019s job is transport and fan-out, not merging.",
        implementation: "A custom WebSocket server implementing the Yjs sync and awareness protocols. Each board gets a dedicated room, so collaboration sessions are isolated and a busy board cannot leak updates or presence into another.",
        outcome: "Live cursors, presence, and seamless multiplayer editing, with convergence guaranteed by the CRDT rather than by server-side coordination."
      },
      {
        title: "Authenticated, authorized WebSocket connections",
        problem: "WebSockets bypass the usual per-request middleware chain, so authentication and permissions have to be enforced at the connection boundary.",
        implementation: "Connections authenticate with PASETO v4 tokens, and project-level role-based access control is enforced before a client joins a board room.",
        outcome: "A client that should not see a board never receives its state or its awareness traffic."
      },
      {
        title: "Dual-snapshot persistence",
        problem: "The authoritative document is a Yjs binary state \u2014 lossless, but opaque to queries. An API that needs to list, search, or render previews cannot work against a binary blob.",
        implementation: "Every snapshot is stored twice: the authoritative Yjs binary state for lossless recovery, and a denormalized JSON representation for efficient querying and API reads.",
        outcome: "Recovery replays exact CRDT state; read paths never touch or decode the binary format."
      },
      {
        title: "Split storage: PostgreSQL and MongoDB",
        implementation: "PostgreSQL with Prisma holds the relational data \u2014 users, projects, memberships, sharing \u2014 where integrity and joins matter. MongoDB with Mongoose absorbs the high-frequency diagram mutation writes."
      },
      {
        title: "Scalable notifications and background jobs",
        problem: "Server-sent notification streams are pinned to one process; with multiple instances behind a load balancer, an event raised on one instance must reach clients connected to another.",
        implementation: "Notifications go out over SSE with Redis Pub/Sub fanning events out across instances. BullMQ workers handle asynchronous email and notification processing off the request path.",
        outcome: "Notification delivery scales horizontally, and slow work never blocks an API response."
      },
      {
        title: "Reliability and operations baseline",
        implementation: "Zod validation on inputs, Helmet and CORS, rate limiting, centralized error handling, structured logging with Pino, and Prometheus metrics. Collaboration behavior is verified with integration tests, and the platform runs containerized via Docker Compose behind Nginx."
      }
    ],
    incidents: [],
    decisions: [
      {
        title: "Two snapshot formats instead of one",
        reasoning: "The Yjs binary state is the only lossless representation of the document, but it cannot be queried. Rather than force one format to do both jobs badly, each read path gets the format built for it: binary for recovery, denormalized JSON for the API.",
        tradeoff: "Every snapshot is written and stored twice, and the two representations must be kept consistent."
      },
      {
        title: "PostgreSQL and MongoDB side by side",
        reasoning: "Identity, membership, and sharing are relational problems \u2014 foreign keys and constraints catch real bugs there. Diagram mutations are high-frequency, schema-light writes that fit a document store.",
        tradeoff: "Two databases mean two operational surfaces: separate backups, migrations, and failure modes."
      },
      {
        title: "SSE for notifications, WebSockets for collaboration",
        reasoning: "Board collaboration is genuinely bidirectional, so it runs over WebSockets. Notifications are one-way server-to-client, and SSE with Redis Pub/Sub fan-out delivers them across horizontally scaled instances without holding a second full-duplex socket per user."
      }
    ],
    performance: [],
    security: [
      {
        title: "PASETO v4 tokens",
        body: "WebSocket connections are secured with PASETO v4 authentication before any board state is exchanged."
      },
      {
        title: "Project-level RBAC",
        body: "Role-based access control is enforced per project, and collaboration sessions are isolated into dedicated board rooms."
      },
      {
        title: "Input and transport hardening",
        body: "Zod validates inputs at the boundary; Helmet, CORS, and rate limiting cover the transport layer; errors flow through one centralized handler so failures never leak internals."
      }
    ],
    lessons: [],
    result: [],
    metaTitle: "SRVJ Deep Dive \u2022 Real-Time CRDT Collaboration Backend",
    metaDescription: "Deep dive into SRVJ, a real-time collaborative diagram editor: Yjs CRDT sync, PASETO-authenticated WebSockets, dual-snapshot persistence, and SSE notifications.",
    datePublished: "2026-07-09",
    relatedBlogSlugs: [
      "crdts-yjs-collaborative-editing-srvj",
      "server-sent-events-real-time-notifications-srvj",
      "jwt-vs-paseto-tokens",
      "aws-ec2-s3-kubernetes-production-deployments"
    ],
    keywords: [
      "SRVJ",
      "Real-time collaborative editor",
      "Collaborative diagram editor",
      "Multiplayer diagram editor",
      "Yjs",
      "CRDT",
      "Conflict-free Replicated Data Types",
      "Real-time synchronization",
      "Server-Sent Events",
      "SSE",
      "Socket.IO",
      "Express.js",
      "TypeScript",
      "Node.js",
      "Monolithic Modular Architecture",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
      "Kubernetes",
      "NGINX",
      "AWS EC2",
      "AWS S3",
      "AWS CloudFront",
      "AWS Route 53",
      "GitHub Actions",
      "Vitest",
      "Vue.js",
      "Vue Flow",
      "Vite",
      "Pinia",
      "UnoCSS",
      "Role-Based Access Control",
      "RBAC",
      "PASETO",
      "WebSocket Authentication",
      "Backend Architecture",
      "Distributed Systems",
      "Real-time Backend",
      "Collaborative Software"
    ]
  }
];

const WIDTH = 1200;
const HEIGHT = 630;
const fontsDir = resolve(process.cwd(), "build", "fonts");
const fontFiles = [
  resolve(fontsDir, "Inter-Regular.ttf"),
  resolve(fontsDir, "Inter-SemiBold.ttf"),
  resolve(fontsDir, "Inter-Bold.ttf"),
  resolve(fontsDir, "InterDisplay-Bold.ttf")
];
const escapeXml$1 = (value) => value.replace(
  /[&<>"']/g,
  (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
);
const wrapText = (text, fontSize, maxWidth, maxLines) => {
  const charWidth = fontSize * 0.52;
  const maxChars = Math.max(1, Math.floor(maxWidth / charWidth));
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
    if (lines.length === maxLines) break;
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines) {
    const consumed = lines.join(" ").length;
    if (consumed < text.replace(/\s+/g, " ").length) {
      let last = lines[maxLines - 1];
      while (last.length > 1 && last.length > maxChars - 1) last = last.slice(0, -1);
      lines[maxLines - 1] = `${last.replace(/[\s.,]+$/, "")}\u2026`;
    }
  }
  return lines;
};
const tspans = (lines, x, startY, lineHeight) => lines.map((line, i) => `<tspan x="${x}" y="${startY + i * lineHeight}">${escapeXml$1(line)}</tspan>`).join("");
const buildSvg = (card) => {
  const accent = "#6cb6ff";
  const titleLines = wrapText(card.title, 62, WIDTH - 160, 3);
  const subtitleLines = wrapText(card.subtitle, 28, WIDTH - 160, titleLines.length >= 3 ? 1 : 2);
  const titleY = 250;
  const subtitleY = titleY + titleLines.length * 74 + 30;
  let grid = "";
  for (let x = 48; x < WIDTH; x += 48) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" />`;
  for (let y = 48; y < HEIGHT; y += 48) grid += `<line x1="0" y1="${y}" x2="${WIDTH}" y2="${y}" />`;
  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0b0f17"/>
  <g stroke="${accent}" stroke-width="1" opacity="0.06">${grid}</g>
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>
  <g stroke="${accent}" stroke-width="2">
    <path d="M24 60 V24 H60" fill="none"/>
    <path d="M${WIDTH - 60} 24 H${WIDTH - 24} V60" fill="none"/>
    <path d="M24 ${HEIGHT - 60} V${HEIGHT - 24} H60" fill="none"/>
    <path d="M${WIDTH - 60} ${HEIGHT - 24} H${WIDTH - 24} V${HEIGHT - 60}" fill="none"/>
  </g>
  <text x="80" y="96" font-family="Inter" font-weight="600" font-size="22" letter-spacing="4" fill="${accent}" fill-opacity="0.85">${escapeXml$1(card.eyebrow)}</text>
  <text x="${WIDTH - 80}" y="96" text-anchor="end" font-family="Inter" font-weight="600" font-size="22" letter-spacing="2" fill="#9fb2c7">elrefai.me</text>
  <rect x="80" y="140" width="${card.chip.length * 15 + 44}" height="44" rx="22" fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.5"/>
  <text x="${80 + 22}" y="169" font-family="Inter" font-weight="600" font-size="22" letter-spacing="2" fill="${accent}">${escapeXml$1(card.chip.toUpperCase())}</text>
  <text font-family="Inter Display" font-weight="700" font-size="62" fill="#f4f7fb">${tspans(titleLines, 80, titleY, 74)}</text>
  <text font-family="Inter" font-weight="400" font-size="28" fill="#9fb2c7">${tspans(subtitleLines, 80, subtitleY, 40)}</text>
  <line x1="80" y1="${HEIGHT - 92}" x2="${WIDTH - 80}" y2="${HEIGHT - 92}" stroke="${accent}" stroke-opacity="0.25" stroke-width="1"/>
  <text x="80" y="${HEIGHT - 52}" font-family="Inter" font-weight="600" font-size="24" fill="#c7d4e3">${escapeXml$1(card.footerLeft)}</text>
  <text x="${WIDTH - 80}" y="${HEIGHT - 52}" text-anchor="end" font-family="Inter" font-weight="400" font-size="20" fill="#7d90a6">${escapeXml$1(card.footerRight)}</text>
</svg>`;
};
const renderOgPng = (card) => {
  const resvg = new Resvg(buildSvg(card), {
    fitTo: { mode: "width", value: WIDTH },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Inter" },
    background: "#0b0f17"
  });
  return resvg.render().asPng();
};
const author = "Mohammed Mostafa \xB7 Software Engineer";
const blogCard = (blog) => ({
  fileName: `blog-${blog.slug}.png`,
  eyebrow: "L-04 \xB7 JOURNAL / ARTICLE",
  chip: blog.category,
  title: blog.title,
  subtitle: blog.excerpt,
  footerLeft: `Mohammed Mostafa \xB7 ${blog.readTime}`,
  footerRight: blog.tags.slice(0, 5).join("   \xB7   ")
});
const projectCard = (cs) => ({
  fileName: `project-${cs.slug}.png`,
  eyebrow: "L-03 \xB7 PROJECT / DEEP DIVE",
  chip: cs.category,
  title: cs.name,
  subtitle: cs.summary,
  footerLeft: author,
  footerRight: cs.stack.slice(0, 4).join("   \xB7   ")
});
const staticCards = [
  {
    fileName: "page-home.png",
    eyebrow: "L-01 \xB7 PORTFOLIO / HOME",
    chip: "Software Engineer",
    title: "Mohammed Mostafa",
    subtitle: "Backend engineer in Cairo, Egypt \u2014 APIs, payment integrations, and cloud systems with Node.js, TypeScript, and AWS.",
    footerLeft: author,
    footerRight: "Node.js \xB7 TypeScript \xB7 AWS \xB7 Backend"
  },
  {
    fileName: "page-projects.png",
    eyebrow: "L-02 \xB7 PROJECTS / INDEX",
    chip: "Selected Work",
    title: "Projects & Open-Source Work",
    subtitle: "Lesoll, EGYStay, SRVJ, KeepITs, 0Gosha, Gen-Import, Elrecord \u2014 backend, API, payment, cloud, and developer tooling.",
    footerLeft: author,
    footerRight: "Backend \xB7 APIs \xB7 Payments \xB7 Tooling"
  },
  {
    fileName: "page-blogs.png",
    eyebrow: "L-04 \xB7 JOURNAL / INDEX",
    chip: "Field Notes",
    title: "Backend Engineering Notes",
    subtitle: "Node.js, TypeScript, Express.js, API architecture, queues, Redis, authentication, payment tokens, and production systems.",
    footerLeft: author,
    footerRight: "Node.js \xB7 TypeScript \xB7 Queues \xB7 APIs"
  },
  {
    fileName: "page-resume.png",
    eyebrow: "L-03 \xB7 RESUME / CV",
    chip: "Curriculum Vitae",
    title: "Resume \u2014 Backend Engineer",
    subtitle: "Node.js, TypeScript, scalable APIs, payment integrations, MongoDB, PostgreSQL, Redis, Docker, and AWS.",
    footerLeft: author,
    footerRight: "Node.js \xB7 TypeScript \xB7 Cloud \xB7 Databases"
  }
];
const allCards = (blogs2) => [
  ...staticCards,
  ...caseStudies.map(projectCard),
  ...blogs2.map(blogCard)
];
let cachedFontCheck = false;
const ensureFonts = () => {
  if (cachedFontCheck) return;
  for (const file of fontFiles) readFileSync(file);
  cachedFontCheck = true;
};

const blogs = [
  {
    id: 5,
    slug: "aws-ec2-s3-kubernetes-production-deployments",
    ogImage: "/og/blog-aws-ec2-s3-kubernetes-production-deployments.png",
    title: "From One EC2 Box to Kubernetes: How SRVJ Actually Deploys on AWS",
    excerpt: "How SRVJ's deployment grew up in three acts \u2014 a single EC2 box with NGINX and pm2, Docker Compose, and finally a Kubernetes cluster with kustomize, an NGINX ingress, and an HPA. Plus the S3 patterns that outlived every stage.",
    metaTitle: "AWS EC2, S3 & Kubernetes: SRVJ's Deployment Journey",
    metaDescription: "How SRVJ's Node.js deployment evolved from one EC2 box with NGINX and pm2 to Docker Compose and Kubernetes \u2014 plus S3 avatars and presigned uploads.",
    category: "Cloud & DevOps",
    date: "2026-07-09",
    updated: "2026-07-10",
    readTime: "13 min read",
    tags: ["AWS", "EC2", "S3", "EKS", "Kubernetes", "Docker", "NGINX", "CI/CD", "Node.js", "DevOps"],
    entities: [
      { name: "Amazon Web Services", sameAs: ["https://en.wikipedia.org/wiki/Amazon_Web_Services", "https://aws.amazon.com"] },
      { name: "Amazon EC2", sameAs: "https://en.wikipedia.org/wiki/Amazon_Elastic_Compute_Cloud" },
      { name: "Kubernetes", sameAs: ["https://en.wikipedia.org/wiki/Kubernetes", "https://kubernetes.io"] },
      { name: "Amazon S3", sameAs: "https://en.wikipedia.org/wiki/Amazon_S3" },
      { name: "Docker", sameAs: "https://en.wikipedia.org/wiki/Docker_(software)" },
      { name: "NGINX", sameAs: "https://en.wikipedia.org/wiki/Nginx" }
    ],
    relatedSlugs: ["crdts-yjs-collaborative-editing-srvj", "server-sent-events-real-time-notifications-srvj"],
    blocks: [
      {
        type: "paragraph",
        text: "SRVJ \u2014 the [collaborative diagram tool](/projects/srvj) I keep writing about \u2014 runs on AWS, but it didn't start on Kubernetes, and it shouldn't have. This post is its deployment story in three acts: a single EC2 box with NGINX and pm2, then Docker Compose, then a Kubernetes cluster \u2014 plus the S3 patterns that survived every stage untouched."
      },
      {
        type: "paragraph",
        text: "I'm writing it this way because most AWS content starts at the end. You get the EKS tutorial with the Terraform modules and the service mesh, and nobody tells you that a $10 EC2 instance with a well-configured NGINX serves real production traffic just fine \u2014 or when, exactly, it stops being fine."
      },
      {
        type: "heading",
        text: "Act one: a box, NGINX, and pm2"
      },
      {
        type: "paragraph",
        text: "SRVJ's backend started life the way most Node.js backends do: one EC2 instance, Route 53 pointing at its Elastic IP, NGINX terminating TLS and reverse-proxying to the app, and pm2 keeping the process alive. It's unfashionable and it works."
      },
      {
        type: "code",
        language: "nginx",
        filename: "srvj.conf",
        code: 'upstream srvj_backend {\n    server srvj-app:60459;\n    keepalive 32;\n}\n\nlimit_req_zone $binary_remote_addr zone=api_limit:10m  rate=30r/s;\nlimit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/m;\n\nserver {\n    listen 443 ssl http2;\n    server_name api.srvj.com;\n    # (TLS, security headers, and Host/X-Forwarded-* lines omitted for brevity)\n\n    # \u2500\u2500 API routes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    location /api/ {\n        limit_req zone=api_limit burst=50 nodelay;\n        proxy_pass http://srvj_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Connection "";\n        proxy_buffering off;\n    }\n\n    # \u2500\u2500 Auth routes (stricter: 5 req/min) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    location /api/v1/auth/ {\n        limit_req zone=auth_limit burst=3 nodelay;\n        proxy_pass http://srvj_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Connection "";\n    }\n\n    # \u2500\u2500 SSE notifications (long-lived, unbuffered) \u2500\n    location /api/v1/notifications/stream {\n        proxy_pass http://srvj_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Connection "";\n        proxy_buffering off;\n        proxy_cache off;\n        proxy_request_buffering off;\n        chunked_transfer_encoding off;\n        proxy_read_timeout 86400s;\n        proxy_send_timeout 86400s;\n    }\n\n    # \u2500\u2500 WebSockets (collab) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    location /socket.io/ {\n        proxy_pass http://srvj_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_read_timeout 86400s;\n        proxy_send_timeout 86400s;\n    }\n\n    # \u2500\u2500 Metrics (internal only) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    location /metrics {\n        deny all;\n        return 403;\n    }\n}'
      },
      {
        type: "paragraph",
        text: 'Every non-obvious line here came from a real incident, not a template. The auth routes get their own rate-limit zone \u2014 five requests a minute, not thirty a second \u2014 so credential stuffing dies at the proxy without Node spending a single cycle on it. The empty Connection "" header is the easiest one to miss: it pairs with keepalive 32 in the upstream block, and without it NGINX silently opens and closes a fresh upstream connection per request, throwing the keepalive pool away.'
      },
      {
        type: "paragraph",
        text: `The SSE location is the paranoid one, and every line earns its place: proxy_buffering, proxy_cache, and proxy_request_buffering all off, chunked_transfer_encoding off, and day-long read/send timeouts so NGINX doesn't kill a quiet stream at its 60-second default. With buffering on, NGINX holds your carefully streamed events hostage until its buffer fills, and "real-time" notifications arrive in batches. The WebSocket location needs the opposite treatment \u2014 the Upgrade/Connection pair, without which the collab handshake dies at the proxy. And /metrics is a flat deny: Prometheus scrapes from inside the network, the internet gets a 403.`
      },
      {
        type: "paragraph",
        text: "pm2 runs the app in cluster mode \u2014 one worker per vCPU behind a shared port:"
      },
      {
        type: "code",
        language: "js",
        filename: "ecosystem.config.js",
        code: "module.exports = {\n  apps: [{\n    name: 'api',\n    script: './dist/server.js',\n    instances: 'max',\n    exec_mode: 'cluster',\n    max_memory_restart: '512M',\n    env_production: { NODE_ENV: 'production' },\n  }],\n}"
      },
      {
        type: "paragraph",
        text: "Cluster mode has a trap that's especially vicious for SRVJ: workers don't share memory. The SSE connection registry fragments across workers \u2014 solvable with Redis Pub/Sub, which the notification pipeline needed anyway. The Yjs collab rooms are the harder case: a room is an in-memory Y.Doc, and two clients on the same diagram must reach the same process. On the single box that meant keeping the collab-bearing app in one process and scaling vertically \u2014 an early taste of exactly the problem act three is about."
      },
      {
        type: "paragraph",
        text: "What finally hurt wasn't performance. It was that the box itself was the deployment artifact. Deploys were SSH-and-pull. The Node version, the system packages, the NGINX config \u2014 all hand-applied state that existed nowhere in git. Every month the server drifted a little further from anything I could reproduce, and rollback meant remembering what I'd changed."
      },
      {
        type: "heading",
        text: "Act two: same box, but Docker"
      },
      {
        type: "paragraph",
        text: "The fix for drift is making the artifact immutable. GitHub Actions builds a Docker image on every push to main, tags it with the commit SHA, and pushes it to ECR. The EC2 box pulls and restarts. Same hardware, completely different operational story:"
      },
      {
        type: "list",
        items: [
          'The image is the whole runtime \u2014 Node version, native deps, everything. "Works on my machine" stops being a sentence anyone says.',
          "Rollback is re-tagging: pull the previous SHA, restart. Under a minute, no archaeology.",
          "The box degrades into a dumb Docker host. Nothing on it is precious anymore \u2014 I could rebuild it from a short user-data script."
        ]
      },
      {
        type: "paragraph",
        text: "In SRVJ's case the compose file is three containers on a private bridge network: the app, Redis with append-only persistence, and NGINX with the act-one config mounted read-only. That's also when the upstream stopped being 127.0.0.1:3000 and became a Docker service name \u2014 the srvj-app:60459 you saw in the config above."
      },
      {
        type: "paragraph",
        text: "This stage is criminally underrated. Docker-on-EC2 has none of Kubernetes' complexity and buys you 80% of its reproducibility. If SRVJ had stayed a single well-understood process with vertical headroom left on the instance, this is where the story would end \u2014 and for most backends, it should."
      },
      {
        type: "heading",
        text: "The S3 pattern that never changed: presigned uploads"
      },
      {
        type: "paragraph",
        text: "While the compute story kept evolving, file uploads landed on a pattern in week one that has survived every migration since: clients upload directly to S3 with presigned URLs, and the backend never proxies a user's file bytes."
      },
      {
        type: "paragraph",
        text: "The naive version \u2014 multipart POST to the API, which streams to S3 \u2014 makes your API instance a file proxy. SRVJ's uploads are avatars and images dropped onto the canvas; routing those through Express means tying up workers, memory, and bandwidth on traffic that S3 could have absorbed directly. The presigned flow inverts it: the client asks the API for permission, gets a short-lived URL, and does the heavy lifting itself."
      },
      {
        type: "code",
        language: "ts",
        filename: "upload.service.ts",
        code: "import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'\nimport { getSignedUrl } from '@aws-sdk/s3-request-presigner'\nimport crypto from 'crypto'\n\nconst s3 = new S3Client({ region: process.env.AWS_REGION })\n\nexport async function createUploadUrl(userId: string, contentType: string) {\n  if (!ALLOWED_TYPES.has(contentType)) throw new Error('Unsupported type')\n\n  const key = `uploads/${userId}/${crypto.randomUUID()}`\n  const url = await getSignedUrl(\n    s3,\n    new PutObjectCommand({\n      Bucket: process.env.S3_BUCKET!,\n      Key: key,\n      ContentType: contentType,\n    }),\n    { expiresIn: 300 }, // 5 minutes \u2014 permission, not possession\n  )\n  return { url, key }\n}"
      },
      {
        type: "paragraph",
        text: "Three details matter more than the happy path. The key is server-generated \u2014 clients never choose where they write, which closes the overwrite-someone-else's-file hole. The content type is validated and baked into the signature, so the URL can't be reused for a different payload. And the URL expires in minutes, because it's a permission slip, not a possession."
      },
      {
        type: "paragraph",
        text: "Reads go through CloudFront, not S3 directly. The bucket is private; CloudFront gets access through Origin Access Control, and every image URL the API returns is a CDN URL. Users in Cairo hit a nearby edge instead of the bucket's region, S3 GET costs drop to near nothing on hot objects, and the bucket itself has no public surface at all."
      },
      {
        type: "heading",
        text: "The other S3 path: avatars born on the server"
      },
      {
        type: "paragraph",
        text: "Not every object in the bucket arrives through a presigned URL, though. When a new account registers, SRVJ generates the user's default avatar on the backend \u2014 a colored tile with their initials, rendered with sharp and pushed straight to S3:"
      },
      {
        type: "code",
        language: "ts",
        filename: "avatar.service.ts",
        code: 'export const avatarProfile = async (firstName: string, lastName: string, id: string) => {\n  const backgroundColor = getRandomColor(colorArray) // 12-color brand palette\n  const textColor = getTextColor(backgroundColor)\n  let initials = buildInitials(firstName, lastName)\n\n  // Arabic initials get spacing \u2014 two joined glyphs read as a word, not initials\n  if (await detectScript(`${firstName} ${lastName}`) === \'Arabic\')\n    initials = initials.split(\'\').join(\' \')\n\n  const imageBuffer = await sharp({\n    create: { width: 450, height: 450, channels: 4, background: backgroundColor },\n  })\n    .composite([{\n      input: Buffer.from(`\n        <svg width="450" height="450">\n          <text x="50%" y="60%" font-size="150" font-family="Arial"\n                text-anchor="middle" fill="${textColor}">${initials}</text>\n        </svg>`),\n      top: 0, left: 0,\n    }])\n    .png()\n    .toBuffer()\n\n  const d = new Date()\n  const key = `cdn/user/${d.getFullYear()}/${d.getMonth() + 1}/${id}.png`\n\n  await s3Client.send(new PutObjectCommand({\n    Bucket: process.env.AWS_S3_BUCKET!,\n    Key: key,\n    Body: imageBuffer,\n    ContentType: \'image/png\',\n  }))\n\n  return `${process.env.CDN_CLOUD_URL}${key}` // CloudFront URL, never raw S3\n}'
      },
      {
        type: "paragraph",
        text: "The part I'm fondest of is the text color. Instead of hardcoding white-on-anything, the background's perceived brightness is computed with the classic YIQ weights \u2014 red, green, and blue don't contribute equally to how bright a color looks \u2014 and the initials flip to dark slate on light tiles:"
      },
      {
        type: "code",
        language: "ts",
        filename: "avatar.service.ts",
        code: "function getTextColor(backgroundColor: string) {\n  const hex = backgroundColor.replace('#', '')\n  const red = parseInt(hex.slice(0, 2), 16)\n  const green = parseInt(hex.slice(2, 4), 16)\n  const blue = parseInt(hex.slice(4, 6), 16)\n  const brightness = (red * 299 + green * 587 + blue * 114) / 1000\n  return brightness > 160 ? '#1F2937' : '#F8FAFC'\n}"
      },
      {
        type: "paragraph",
        text: "A few details that matter beyond the pixels. Names in Egypt are Arabic as often as English, so the script detection walks the name's Unicode code points (the 0x0600\u20130x06FF block and friends) rather than assuming Latin initials. The object key is partitioned by year and month \u2014 cdn/user/2026/7/\u2026 \u2014 which keeps prefixes browsable and makes lifecycle rules trivial later. And the function returns the CloudFront URL, not the S3 one, so the private-bucket rule from the previous section holds even for objects the server created itself."
      },
      {
        type: "paragraph",
        text: "It's also the counterpoint to the presigned pattern, and the rule that reconciles them: whoever owns the bytes talks to S3. A user's photo upload is theirs \u2014 presigned URL, direct to bucket. A generated avatar is the server's \u2014 PutObjectCommand from the process that made it. Both end up behind the same CDN."
      },
      {
        type: "heading",
        text: "Act three: SRVJ's shape and the case for Kubernetes"
      },
      {
        type: "paragraph",
        text: "SRVJ broke the single-box model for a boring, structural reason: it isn't one process. The same image runs twice with different entrypoints \u2014 API pods serving REST, SSE streams, and the Yjs collab WebSockets (node dist/src/app.js), and a BullMQ worker draining the notification queue (node dist/src/MessageQueue/index.js). They deploy together but scale apart: a burst of collab sessions needs API capacity, a notification storm needs worker throughput, and on one box all of it shares one blast radius and one scaling knob."
      },
      {
        type: "paragraph",
        text: "This is the actual Kubernetes threshold, in my experience. Not traffic. Shape. The moment your system is several processes with different scaling profiles and you're hand-writing systemd units or docker-compose overrides to fake orchestration, you're implementing a worse Kubernetes on your own time."
      },
      {
        type: "code",
        language: "mermaid",
        filename: "srvj-aws.mmd",
        code: "flowchart LR\n    U[Client] --> R53[Route 53]\n    R53 --> CF[CloudFront]\n    CF -->|images, static| S3[(Private S3 bucket)]\n    CF -->|api + collab| ING[NGINX Ingress]\n    ING --> API[API pods, HPA 2-8]\n    API --> PG[(PostgreSQL)]\n    API --> M[(MongoDB)]\n    API --> RD[(Redis StatefulSet)]\n    W[BullMQ worker] --> RD\n    W --> PG\n    U -.presigned PUT.-> S3"
      },
      {
        type: "paragraph",
        text: "A confession before the YAML: SRVJ's cluster today is self-managed on EC2, not EKS \u2014 kustomize-applied manifests, an NGINX ingress controller, local-path storage. Running it myself is exactly how I learned what EKS's control-plane fee actually buys: etcd care, control-plane upgrades, certificate rotation \u2014 the parts of Kubernetes you least want to own at 3 AM. The manifests are portable either way; moving to EKS changes who runs the control plane, not what the app looks like."
      },
      {
        type: "paragraph",
        text: "The API deployment is where the operational lessons from acts one and two turned into configuration:"
      },
      {
        type: "code",
        language: "yaml",
        filename: "k8s/api/deployment.yaml",
        code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: srvj-api\n  namespace: srvj\nspec:\n  replicas: 2\n  strategy:\n    rollingUpdate:\n      maxUnavailable: 0   # never dip below capacity mid-deploy\n      maxSurge: 1\n  template:\n    spec:\n      terminationGracePeriodSeconds: 30\n      securityContext:\n        runAsNonRoot: true\n      containers:\n        - name: srvj-api\n          image: srvj-backend:latest\n          command: [node, -r, tsconfig-paths/register, dist/src/app.js]\n          envFrom:\n            - secretRef: { name: srvj-secret }\n          ports:\n            - containerPort: 60459\n          securityContext:\n            allowPrivilegeEscalation: false\n            capabilities: { drop: [ALL] }\n            seccompProfile: { type: RuntimeDefault }\n          resources:\n            requests: { cpu: 200m, memory: 256Mi }\n            limits: { cpu: 1000m, memory: 1Gi }\n          readinessProbe:\n            httpGet: { path: /api/health, port: 60459 }\n            initialDelaySeconds: 10\n          livenessProbe:\n            httpGet: { path: /api/health, port: 60459 }\n            initialDelaySeconds: 20\n          lifecycle:\n            preStop:\n              exec: { command: [/bin/sh, -c, sleep 5] }"
      },
      {
        type: "paragraph",
        text: 'Both probes currently point at the same /api/health endpoint, and that deserves an honest note. Readiness and liveness are different questions \u2014 "can I serve a request right now" versus "is this process worth keeping alive" \u2014 and the dangerous failure mode is a liveness probe that checks dependencies: if MongoDB blips and liveness notices, Kubernetes restart-loops every healthy pod in sympathy with the database. The endpoint is dependency-free today, which keeps that trap shut; splitting it into a ready check that verifies Mongo and Redis and a live check that verifies nothing is the planned refinement.'
      },
      {
        type: "paragraph",
        text: 'The preStop sleep plus the 30-second termination grace is the other hard-won pattern. During a rollout the pod is removed from the endpoints list and sent SIGTERM concurrently \u2014 without a grace window, in-flight requests and open SSE streams die mid-byte. A few seconds of "keep serving, take nothing new" makes deploys invisible to connected clients. And the security context \u2014 runAsNonRoot, all capabilities dropped, no privilege escalation, default seccomp \u2014 costs nothing at this stage and is miserable to retrofit later.'
      },
      {
        type: "paragraph",
        text: `The worker is the same image with a different entrypoint and deliberately different rules. Its strategy is Recreate, not RollingUpdate: during an API rollout you want old and new pods overlapping; during a worker rollout, overlap means two workers competing for the same BullMQ jobs mid-deploy. It also gets 60 seconds of termination grace instead of 30, because "finish the job you're holding" takes longer than "finish the HTTP request you're serving". Scaling is asymmetric too \u2014 an HPA takes the API from 2 to 8 replicas on 70% CPU or 80% memory, while the worker stays at one replica until job volume, not traffic, says otherwise. That asymmetry is the whole point of splitting them.`
      },
      {
        type: "paragraph",
        text: "And the act-one NGINX config didn't die \u2014 it migrated into the ingress controller as annotations and snippets. The global rate limit became limit-rps: 30; a server-snippet reproduces the 5-per-minute auth zone; the SSE location moved wholesale, buffering kills and day-long timeouts intact; /metrics is still a flat 403. Same hard-won lines, new address."
      },
      {
        type: "heading",
        text: "The deploy: one apply, and an honest gap"
      },
      {
        type: "paragraph",
        text: "The whole stack is kustomize-driven \u2014 namespace, secrets, the Redis StatefulSet, both Deployments, the HPA, and the ingress are one kubectl apply -k k8s/ away, and the manifest tree in git is the cluster's source of truth:"
      },
      {
        type: "code",
        language: "yaml",
        filename: "k8s/kustomization.yaml",
        code: "namespace: srvj\n\nresources:\n  - namespace.yaml\n  - secret.yaml\n  - redis/statefulset.yaml\n  - redis/service.yaml\n  - api/deployment.yaml\n  - api/service.yaml\n  - api/hpa.yaml\n  - worker/deployment.yaml\n  - ingress/configmap.yaml\n  - ingress/ingress.yaml"
      },
      {
        type: "paragraph",
        text: "The honest gap: the image is still srvj-backend:latest with imagePullPolicy: IfNotPresent, which means a rollout doesn't reliably pick up a new build \u2014 the act-two lesson about immutable SHA-tagged artifacts hasn't been fully carried into the cluster yet. It's the top of the improvement list, because kubectl rollout undo is only a real rollback when tags are immutable. What already works in my favor: maxUnavailable: 0 means a build whose pods never pass readiness stalls the rollout while the old pods keep serving \u2014 a bad deploy degrades into a stuck rollout, not an outage."
      },
      {
        type: "heading",
        text: "What Kubernetes actually costs (it's not just the invoice)"
      },
      {
        type: "paragraph",
        text: "I'd be lying if I presented act three as pure upside. Self-managing the cluster means I am the control plane's administrator \u2014 upgrades, certificates, backups \u2014 which is precisely the ledger EKS's flat fee is weighed against; it doesn't remove the YAML, it removes being the etcd administrator, and the nodes are still just EC2 underneath. The in-cluster Redis is a single-replica StatefulSet on local-path storage, which pins it to one node: fine for a rebuildable queue, unacceptable if it ever grows into primary state. And the collab rooms live in-memory inside the API pods, so two clients editing the same diagram can land on different replicas \u2014 session affinity papers over it until the Redis fanout between pods lands (the same unsolved item from the [CRDTs post](/blogs/crdts-yjs-collaborative-editing-srvj))."
      },
      {
        type: "paragraph",
        text: "So the honest decision matrix, from someone running all three stages in production simultaneously:"
      },
      {
        type: "list",
        items: [
          "One service, one team, predictable load \u2192 Docker on a single EC2 box. This is most backends, and it's where SRVJ lived happily for its first stretch.",
          "Multiple processes with different scaling profiles, zero-downtime deploys as a requirement \u2192 Kubernetes earns its complexity, and a managed control plane (EKS) is the part worth paying for. This is SRVJ today.",
          "File uploads \u2192 presigned S3 URLs behind CloudFront, at every stage, regardless of everything else. The one decision I've never revisited."
        ]
      },
      {
        type: "paragraph",
        text: "The progression matters more than the destination. Every stage solved the specific pain the previous one produced \u2014 drift got me to Docker, shape got me to Kubernetes \u2014 and each migration was small because the artifact (the image) and the S3 paths were already settled. If there's one takeaway: adopt the boring parts early, and let the orchestration wait until your architecture, not your ambition, asks for it."
      }
    ]
  },
  {
    id: 4,
    slug: "crdts-yjs-collaborative-editing-srvj",
    ogImage: "/og/blog-crdts-yjs-collaborative-editing-srvj.png",
    title: "CRDTs, Yjs, and the Day I Stopped Writing Conflict-Resolution Code",
    excerpt: "Why I stopped writing conflict-resolution code for SRVJ's collaborative diagrams \u2014 CRDTs from first principles (G-Counter, LWW-Register, OR-Set, sequence types), then Yjs and the authenticated WebSocket relay that keeps every editor converged.",
    metaTitle: "CRDTs & Yjs: Conflict-Free Real-Time Collaboration",
    metaDescription: "How CRDTs and Yjs power conflict-free collaborative editing in SRVJ \u2014 G-Counter, LWW-Register and OR-Set explained, plus an authenticated WebSocket relay.",
    category: "Distributed Systems",
    date: "2026-07-06",
    updated: "2026-07-10",
    readTime: "13 min read",
    tags: ["CRDT", "Yjs", "Collaborative Editing", "Real-Time", "Distributed Systems", "WebSocket", "TypeScript", "Node.js"],
    entities: [
      { name: "Conflict-free replicated data type", sameAs: ["https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type", "https://crdt.tech"] },
      { name: "Yjs", sameAs: ["https://github.com/yjs/yjs", "https://docs.yjs.dev"] },
      { name: "Collaborative real-time editor", sameAs: "https://en.wikipedia.org/wiki/Collaborative_real-time_editor" },
      { name: "Operational transformation", sameAs: "https://en.wikipedia.org/wiki/Operational_transformation" },
      { name: "WebSocket", sameAs: "https://en.wikipedia.org/wiki/WebSocket" }
    ],
    relatedSlugs: ["server-sent-events-real-time-notifications-srvj", "aws-ec2-s3-kubernetes-production-deployments"],
    blocks: [
      {
        type: "paragraph",
        text: "While building SRVJ (a collaborative diagram tool I've been working on), I hit the problem every real-time app eventually hits: two people drag the same node at the same time. Who wins?"
      },
      {
        type: "paragraph",
        text: `My first instinct was the classic one \u2014 lock the node while someone is editing it. Terrible idea. Locks in a whiteboard feel like someone grabbing your mouse. Second instinct: last-write-wins on the server. Also bad, because "last" depends on network latency, and someone's work silently disappears. Third instinct: operational transformation, the Google Docs approach. I read two papers, looked at the transformation matrices you need to maintain for every pair of operations, and closed the tab.`
      },
      {
        type: "paragraph",
        text: "Then I found CRDTs, and the whole problem class just... dissolved. This post is what I wish someone had handed me at the start."
      },
      {
        type: "heading",
        text: "So what is a CRDT?"
      },
      {
        type: "paragraph",
        text: "CRDT stands for Conflict-free Replicated Data Type. The idea sounds almost too simple: instead of writing code that resolves conflicts, you design the data structure so conflicts can't exist. Every replica can accept writes independently \u2014 no coordination, no locks, no central authority \u2014 and when replicas exchange their states, they are mathematically guaranteed to converge to the same result."
      },
      {
        type: "paragraph",
        text: "The guarantee comes from three properties of the merge function:"
      },
      {
        type: "list",
        items: [
          "Commutative \u2014 `merge(a, b) === merge(b, a)`. Order of arrival doesn't matter.",
          "Associative \u2014 `merge(merge(a, b), c) === merge(a, merge(b, c))`. Grouping doesn't matter.",
          "Idempotent \u2014 `merge(a, a) === a`. Receiving the same update twice doesn't matter."
        ]
      },
      {
        type: "paragraph",
        text: 'If your merge satisfies these, replicas can gossip updates in any order, drop duplicates, arrive late \u2014 and still end up identical. This property has a name: strong eventual consistency. Not "eventually the server decides." Every replica that has seen the same set of updates is in the same state, deterministically.'
      },
      {
        type: "paragraph",
        text: "There are two families. State-based CRDTs ship the whole state and merge it (simple, chunky payloads). Operation-based CRDTs ship individual operations (small payloads, but you need reliable delivery). Most production systems, Yjs included, ship compact operation deltas."
      },
      {
        type: "heading",
        text: "Where would you actually use one?"
      },
      {
        type: "paragraph",
        text: "CRDTs are not a general-purpose replacement for your database. They shine in a specific set of situations:"
      },
      {
        type: "paragraph",
        text: "Collaborative editing \u2014 the obvious one. Docs, whiteboards, kanban boards, Figma-style tools. Anywhere multiple cursors touch the same object."
      },
      {
        type: "paragraph",
        text: 'Offline-first apps \u2014 a mobile client edits locally on a plane, syncs three hours later, and the merge just works. No "your version / their version" dialog.'
      },
      {
        type: "paragraph",
        text: `Distributed counters and presence \u2014 likes, view counts, "who's online" across regions. Riak shipped CRDTs years ago, Redis has CRDT-based active-active replication in its enterprise offering.`
      },
      {
        type: "paragraph",
        text: "Multi-region writes \u2014 when you want every region to accept writes without a consensus round-trip per operation."
      },
      {
        type: "paragraph",
        text: `The common thread: availability over coordination. If your domain genuinely needs a single serialized truth (account balances, inventory), CRDTs are the wrong tool. You can't CRDT your way out of "don't sell the same seat twice."`
      },
      {
        type: "heading",
        text: "The classic algorithms"
      },
      {
        type: "paragraph",
        text: "Fair warning: the first three are almost disappointingly simple. That's the point \u2014 the intelligence lives in the data structure, not in some clever resolver."
      },
      {
        type: "heading",
        text: "G-Counter (grow-only counter)",
        level: 3
      },
      {
        type: "paragraph",
        text: "Each replica only increments its own slot. The total is the sum, and merge is an element-wise `max`."
      },
      {
        type: "code",
        language: "ts",
        filename: "g-counter.ts",
        code: "interface GCounterState {\n  counts: Record<string, number>;\n}\n\nclass GCounter {\n  private counts = new Map<string, number>();\n\n  constructor(private readonly replicaId: string) {}\n\n  increment(): void {\n    const current = this.counts.get(this.replicaId) ?? 0;\n    this.counts.set(this.replicaId, current + 1);\n  }\n\n  value(): number {\n    let total = 0;\n    for (const count of this.counts.values()) total += count;\n    return total;\n  }\n\n  merge(other: GCounter): void {\n    for (const [id, count] of other.counts.entries()) {\n      const mine = this.counts.get(id) ?? 0;\n      this.counts.set(id, Math.max(mine, count));\n    }\n  }\n}"
      },
      {
        type: "paragraph",
        text: "Why does `max` work? Because a replica's own counter only ever grows, the highest value you've seen from a replica is its latest value. Merge twice, merge in any order \u2014 same result. All three properties, for free."
      },
      {
        type: "paragraph",
        text: "Need decrements? That's the PN-Counter: two G-Counters, one for increments and one for decrements, value = P \u2212 N. Nothing more to it."
      },
      {
        type: "heading",
        text: "LWW-Register (last-writer-wins register)",
        level: 3
      },
      {
        type: "paragraph",
        text: "A single value with a timestamp. On merge, the higher timestamp wins; ties break on replica ID so both sides pick the same winner."
      },
      {
        type: "code",
        language: "ts",
        filename: "lww-register.ts",
        code: "interface LWWEntry<T> {\n  value: T;\n  timestamp: number;\n  replicaId: string;\n}\n\nclass LWWRegister<T> {\n  constructor(private entry: LWWEntry<T>, private readonly replicaId: string) {}\n\n  set(value: T): void {\n    this.entry = { value, timestamp: Date.now(), replicaId: this.replicaId };\n  }\n\n  get(): T {\n    return this.entry.value;\n  }\n\n  merge(other: LWWRegister<T>): void {\n    const remote = other.entry;\n    const newer =\n      remote.timestamp > this.entry.timestamp ||\n      (remote.timestamp === this.entry.timestamp && remote.replicaId > this.entry.replicaId);\n    if (newer) this.entry = remote;\n  }\n}"
      },
      {
        type: "paragraph",
        text: `Be honest with yourself about what this is: it's deterministic data loss. One concurrent write silently loses. That's fine for a "node color" field. It's not fine for text.`
      },
      {
        type: "heading",
        text: "OR-Set (observed-remove set)",
        level: 3
      },
      {
        type: "paragraph",
        text: 'A plain set breaks under concurrency: if I remove `"x"` while you re-add `"x"`, what should survive? The OR-Set answers "add wins" by tagging every add with a unique ID. Remove only kills the tags you have actually observed \u2014 a concurrent add carries a fresh tag the remove never saw, so it survives.'
      },
      {
        type: "code",
        language: "ts",
        filename: "or-set.ts",
        code: "class ORSet<T> {\n  private adds = new Map<T, Set<string>>();\n  private removes = new Map<T, Set<string>>();\n\n  add(value: T): void {\n    const tags = this.adds.get(value) ?? new Set<string>();\n    tags.add(crypto.randomUUID());\n    this.adds.set(value, tags);\n  }\n\n  remove(value: T): void {\n    const observed = this.adds.get(value);\n    if (!observed) return;\n    const removed = this.removes.get(value) ?? new Set<string>();\n    for (const tag of observed) removed.add(tag);\n    this.removes.set(value, removed);\n  }\n\n  has(value: T): boolean {\n    const added = this.adds.get(value);\n    if (!added) return false;\n    const removed = this.removes.get(value);\n    for (const tag of added) {\n      if (!removed?.has(tag)) return true;\n    }\n    return false;\n  }\n\n  merge(other: ORSet<T>): void {\n    for (const [value, tags] of other.adds) {\n      const mine = this.adds.get(value) ?? new Set<string>();\n      for (const tag of tags) mine.add(tag);\n      this.adds.set(value, mine);\n    }\n    for (const [value, tags] of other.removes) {\n      const mine = this.removes.get(value) ?? new Set<string>();\n      for (const tag of tags) mine.add(tag);\n      this.removes.set(value, mine);\n    }\n  }\n}"
      },
      {
        type: "paragraph",
        text: "Notice what just appeared: removed tags stick around forever. Those are tombstones, and they're the tax you pay across almost every CRDT design. Hold that thought."
      },
      {
        type: "heading",
        text: "Sequence CRDTs \u2014 where it gets genuinely hard"
      },
      {
        type: "paragraph",
        text: 'Counters, registers, and sets are a weekend project. Ordered sequences \u2014 text, arrays, lists of diagram nodes \u2014 are a different animal. Array indices are meaningless under concurrency: your "insert at index 3" and my "delete index 2" arrive in different orders on different replicas and index-based logic falls apart instantly.'
      },
      {
        type: "paragraph",
        text: 'The trick every sequence CRDT uses: stop using indices. Give every inserted item a globally unique ID (typically `clientID + logical clock`) and describe its position relative to its neighbors \u2014 "I was inserted after item (client 4, clock 17)". Deletes don\'t remove items; they mark them as tombstones so late-arriving "insert after X" operations still find X. The algorithms \u2014 RGA, Logoot, LSEQ, and YATA (the one Yjs implements) \u2014 differ mainly in how they order items that were concurrently inserted at the same position, and how they keep metadata from eating you alive.'
      },
      {
        type: "paragraph",
        text: "I'm not going to implement YATA in a blog post, and honestly, neither should you in production code. Which brings me to Yjs."
      },
      {
        type: "heading",
        text: "What is Yjs?"
      },
      {
        type: "paragraph",
        text: "Yjs (github.com/yjs/yjs) is a production-grade CRDT implementation, and probably the fastest one in the JavaScript ecosystem. It gives you shared types \u2014 `Y.Map`, `Y.Array`, `Y.Text`, `Y.XmlFragment` \u2014 that behave like normal data structures locally but sync conflict-free across any number of peers."
      },
      {
        type: "paragraph",
        text: "The parts that made me pick it over rolling my own:"
      },
      {
        type: "paragraph",
        text: "It's operation-based and binary. Every local change emits a compact binary update. You don't ship documents around; you ship diffs measured in bytes."
      },
      {
        type: "paragraph",
        text: `State vectors make sync a two-step handshake. A client sends a state vector \u2014 essentially "here's the latest clock I've seen from each peer" \u2014 and the other side responds with exactly the updates that are missing. No diffing full documents, no re-sending history.`
      },
      {
        type: "paragraph",
        text: "The engineering is brutal, in a good way. Yjs merges adjacent items written by the same client into single structs, so typing a 1,000-character paragraph doesn't create 1,000 objects. That single optimization is a large part of why it benchmarks well ahead of naive implementations."
      },
      {
        type: "paragraph",
        text: "Transport-agnostic. Yjs doesn't care how updates travel. WebSocket, WebRTC, carrier pigeon \u2014 the `y-protocols` package defines the sync and awareness message formats, and you bring the pipe."
      },
      {
        type: "paragraph",
        text: 'It also ships awareness as a separate protocol: ephemeral presence data (cursors, selections, "Ali is here") that propagates to peers but deliberately never enters the document. Cursor positions in your edit history would be noise; keeping them out is the right default.'
      },
      {
        type: "heading",
        text: "Why Yjs in SRVJ"
      },
      {
        type: "paragraph",
        text: "SRVJ diagrams are collaboratively edited in real time, and I wanted three things: no lock UX, no server round-trip per keystroke, and a server that doesn't need to understand diagram semantics to keep everyone consistent. Yjs delivers all three, because of the single most important realization in this whole build:"
      },
      {
        type: "paragraph",
        text: "The backend is a relay and a persistence layer. It is not a conflict resolver. Convergence is a property of the data type. The server just moves bytes and occasionally writes them down."
      },
      {
        type: "paragraph",
        text: "Here's the actual flow in SRVJ's collab layer:"
      },
      {
        type: "code",
        language: "mermaid",
        filename: "collab-sync.mmd",
        code: "sequenceDiagram\n    participant C as Client (Y.Doc)\n    participant G as attachCollab (WS upgrade)\n    participant R as Room (Y.Doc + awareness)\n    participant M as MongoDB\n\n    C->>G: upgrade /collab/:site_id (PASETO cookie/Bearer)\n    G->>G: origin check + auth + RBAC\n    G-->>C: close 4400/4401/4403/4404 on failure\n    G->>R: getRoom(siteId) - create if absent\n    R->>M: loadDocument (binary snapshot, else seed from diagram)\n    C->>R: SyncStep1 (my state vector)\n    R-->>C: SyncStep2 (only what you're missing)\n    C->>R: binary update (edit)\n    R->>R: role gate - EDITOR+ only\n    R-->>C: broadcast to every room connection\n    R->>M: debounced storeDocument"
      },
      {
        type: "paragraph",
        text: "A few implementation details worth calling out, because this is where the theory meets an Express server at 2 AM:"
      },
      {
        type: "paragraph",
        text: "Auth happens before any document bytes flow. The WebSocket upgrade on `/collab` checks the origin, extracts the diagram's `site_id` from the URL, verifies the PASETO access token from cookie or Bearer header, and resolves the user's role \u2014 the same identity and RBAC stack the REST layer uses. Failures close the socket with specific codes (4400 bad request, 4401 unauthenticated, 4403 forbidden, 4404 not found) so the client can tell why it was rejected."
      },
      {
        type: "paragraph",
        text: "One in-memory Room per open diagram. A Room owns a `Y.Doc`, an awareness instance, and the set of connections. The interesting bit is read/write gating at the protocol level: a `VIEWER` can send SyncStep1 and receive the full document \u2014 reading is syncing \u2014 but their SyncStep2 and update messages are silently dropped. Only `EDITOR` and above mutate the doc. RBAC enforced inside the sync protocol handler, not just at the door."
      },
      {
        type: "paragraph",
        text: "Dual-debounced persistence. Writing to MongoDB on every keystroke would be absurd; debouncing naively means a user who never stops dragging could postpone persistence forever. So there are two timers: a short trailing debounce (`COLLAB_DEBOUNCE`) that fires after a pause, and a hard cap (`COLLAB_MAX_DEBOUNCE`) tracked from the first pending edit that forces a write even mid-storm. Quiet rooms persist quickly, busy rooms persist at most every max-interval, and the DB never sees per-keystroke traffic."
      },
      {
        type: "paragraph",
        text: "Two representations on every save. `storeDocument` writes `Y.encodeStateAsUpdate(doc)` as a binary `Buffer` \u2014 the CRDT source of truth a returning session resumes from \u2014 and also projects `nodes`, `edges`, and `metadata` as plain JSON back onto the queryable diagram document. The rest of the API can read diagrams without knowing Yjs exists. If no snapshot exists yet, `loadDocument` seeds the Y.Doc from the plain diagram inside a single transaction, so pre-collab diagrams onboard cleanly."
      },
      {
        type: "paragraph",
        text: "Boring but necessary guards. Per-connection rate limiting (200 messages per 10-second window), 30-second ping/pong liveness, and when the last client leaves, the room persists one final time and tears itself down. Integration tests with Vitest and `y-websocket` confirm the parts I care about: an edit on client A lands on client B and in the store, and edits never leak between rooms."
      },
      {
        type: "heading",
        text: "The parts I haven't solved"
      },
      {
        type: "paragraph",
        text: `I'd be lying if I ended on "and everything is perfect."`
      },
      {
        type: "paragraph",
        text: "Tombstones. Remember the OR-Set tax? Yjs pays it too \u2014 deleted items persist as tombstones inside the document so late operations can still resolve their positions. A diagram that lives for months of heavy editing accumulates history it will never need again. There are approaches (snapshotting, `Y.encodeStateAsUpdateV2`, periodic doc rebuilds when no clients are connected), but I don't have a compaction strategy in production yet. It's the top item on the list."
      },
      {
        type: "paragraph",
        text: "Horizontal scaling. Rooms are in-memory, per instance. Two users on the same diagram must land on the same instance, which is fine today and a real constraint tomorrow. The known fix is a Redis pub/sub fanout between instances so a room can span processes \u2014 the same pattern SRVJ already uses for [notification delivery](/blogs/server-sent-events-real-time-notifications-srvj) \u2014 but the collab layer hasn't crossed that bridge yet."
      },
      {
        type: "paragraph",
        text: "LWW inside the map. Concurrent edits to the same key of a `Y.Map` resolve last-writer-wins. Two people recoloring the same node at the same instant: one color survives. For diagram properties that's the correct trade \u2014 nobody wants a merge dialog over a hex code \u2014 but it's worth knowing which semantics you're getting where."
      },
      {
        type: "paragraph",
        text: "If you're building anything multiplayer, my honest advice is: don't write the merge logic. Pick the data structure that makes merging a non-event, put a thin authenticated relay in front of it, and spend your energy on the two problems that actually remain \u2014 persistence and cleanup. That's the whole trick, and it took me an embarrassing amount of reading to learn it."
      }
    ]
  },
  {
    id: 3,
    slug: "server-sent-events-real-time-notifications-srvj",
    ogImage: "/og/blog-server-sent-events-real-time-notifications-srvj.png",
    title: "Server-Sent Events (SSE): Real-Time Notifications in SRVJ",
    excerpt: "How SRVJ delivers real-time notifications with Server-Sent Events, BullMQ, Redis Pub/Sub, and PostgreSQL \u2014 a persist-then-fan-out pipeline that scales horizontally without sticky sessions.",
    metaTitle: "Server-Sent Events (SSE) for Real-Time Notifications",
    metaDescription: "Real-time notifications with SSE, BullMQ, Redis Pub/Sub and PostgreSQL \u2014 a persist-then-fan-out pipeline that scales horizontally without sticky sessions.",
    category: "Backend Architecture",
    date: "2026-06-27",
    updated: "2026-07-10",
    readTime: "9 min read",
    tags: ["SSE", "Server-Sent Events", "Real-Time", "BullMQ", "Redis", "PostgreSQL", "Node.js", "System Design"],
    entities: [
      { name: "Server-sent events", sameAs: ["https://en.wikipedia.org/wiki/Server-sent_events", "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events"] },
      { name: "Redis", sameAs: ["https://en.wikipedia.org/wiki/Redis", "https://redis.io"] },
      { name: "Publish\u2013subscribe pattern", sameAs: "https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern" },
      { name: "WebSocket", sameAs: "https://en.wikipedia.org/wiki/WebSocket" },
      { name: "PostgreSQL", sameAs: "https://en.wikipedia.org/wiki/PostgreSQL" }
    ],
    relatedSlugs: ["crdts-yjs-collaborative-editing-srvj", "aws-ec2-s3-kubernetes-production-deployments"],
    blocks: [
      {
        type: "paragraph",
        text: "SRVJ is a collaborative diagram tool I've been building \u2014 think Miro, but as a playground for backend architecture. The collaborative canvas itself runs over WebSockets ([that story gets its own post](/blogs/crdts-yjs-collaborative-editing-srvj)), but notifications \u2014 board invitations, chat messages, mentions \u2014 needed a delivery path of their own."
      },
      {
        type: "paragraph",
        text: "This post is about that path: why it's Server-Sent Events rather than another WebSocket, and the pipeline behind it \u2014 BullMQ, PostgreSQL, and Redis Pub/Sub, arranged so notifications survive crashes, reach every open tab, and keep working when the app scales past one instance."
      },
      {
        type: "heading",
        text: "What is SSE?"
      },
      {
        type: "paragraph",
        text: "Server-Sent Events is the boring half of real-time: a plain HTTP response the server never finishes. The client opens a request, the server holds the connection open and writes events into it whenever something happens. Communication is strictly one-way \u2014 server to client."
      },
      {
        type: "paragraph",
        text: "The client side is almost embarrassingly simple, because browsers ship it natively as the EventSource API: automatic reconnection, named events, last-event-ID tracking \u2014 no library required."
      },
      {
        type: "heading",
        text: "Why SSE?"
      },
      {
        type: "paragraph",
        text: "Because notifications don't need a second direction. Collaborative editing is genuinely bidirectional \u2014 clients push document updates continuously \u2014 so it earns its WebSocket. A notification is different: the server has something to say, and the client just listens."
      },
      {
        type: "paragraph",
        text: "Paying for a bidirectional protocol \u2014 the upgrade handshake, a separate connection lifecycle, load-balancer configuration \u2014 to send messages one way is buying capability you'll never use. SSE is plain HTTP: it flows through the same middleware, proxies, and auth as every other request."
      },
      {
        type: "heading",
        text: "Notification Architecture"
      },
      {
        type: "paragraph",
        text: "The pipeline is persist-then-fan-out, and every stage after the user action is asynchronous:"
      },
      {
        type: "list",
        items: [
          "A domain event occurs (board invitation, chat message, etc.).",
          "A BullMQ job is created.",
          "A worker processes the job.",
          "The notification is persisted in PostgreSQL.",
          "The worker publishes the event to Redis Pub/Sub.",
          "The application instance that owns the user's SSE connection delivers the notification instantly."
        ]
      },
      {
        type: "paragraph",
        text: `Generation and delivery are fully decoupled: the API returns as soon as the job is queued, the worker guarantees the notification lands in PostgreSQL, and Redis answers "which instance holds this user's connection" without anyone ever having to ask.`
      },
      {
        type: "heading",
        text: "Opening the SSE Stream"
      },
      {
        type: "paragraph",
        text: "Every authenticated user establishes a long-lived HTTP connection to /stream."
      },
      {
        type: "code",
        language: "ts",
        filename: "sse.stream.ts",
        code: 'res.writeHead(200, {\n  "Content-Type": "text/event-stream",\n  "Cache-Control": "no-cache",\n  Connection: "keep-alive",\n  "X-Accel-Buffering": "no",\n});\nres.flushHeaders?.();'
      },
      {
        type: "paragraph",
        text: "Every one of those headers is load-bearing:"
      },
      {
        type: "list",
        items: [
          "Content-Type: text/event-stream \u2014 Tells the browser that this endpoint will continuously stream events rather than returning a traditional HTTP response.",
          "Cache-Control: no-cache \u2014 Prevents intermediaries and browsers from caching streamed events.",
          "Connection: keep-alive \u2014 Keeps the HTTP connection open for future events.",
          "X-Accel-Buffering: no \u2014 Disables buffering in Nginx. Without this header, notifications may be delayed because Nginx could buffer responses before sending them to clients."
        ]
      },
      {
        type: "heading",
        text: "Managing Active Connections"
      },
      {
        type: "paragraph",
        text: "The same user is routinely connected from three browser tabs and a phone at once, and the registry has to model that. Each new connection is registered like this:"
      },
      {
        type: "code",
        language: "ts",
        filename: "sse.connections.ts",
        code: "const client: SSEClient = { userId, res };\nlet connections = clients.get(userId);\nif (!connections) {\n  connections = new Set<SSEClient>();\n  clients.set(userId, connections);\n}\nconnections.add(client);"
      },
      {
        type: "paragraph",
        text: "Internally, the structure looks like:"
      },
      {
        type: "code",
        language: "ts",
        code: "Map<userId, Set<SSEClient>>"
      },
      {
        type: "paragraph",
        text: "The Map gives constant-time lookup of everything a user has open; the Set inside it gives cheap add/remove and de-duplication as tabs come and go. When a notification arrives for a user, delivery is one lookup and a loop \u2014 every tab, every device, one write each."
      },
      {
        type: "heading",
        text: "Immediately Opening the Stream"
      },
      {
        type: "paragraph",
        text: "After the connection is registered, the server immediately writes an empty event:"
      },
      {
        type: "code",
        language: "ts",
        filename: "sse.stream.ts",
        code: "res.write(`: connected\\n\\n`);"
      },
      {
        type: "paragraph",
        text: "That line is an SSE comment \u2014 clients ignore its content \u2014 but writing it flushes the response and makes the browser fire onopen immediately, instead of leaving the connection in limbo until the first real notification happens to arrive."
      },
      {
        type: "heading",
        text: "Cleaning Up Disconnected Clients"
      },
      {
        type: "paragraph",
        text: "Because SSE connections are long-lived, proper cleanup is essential."
      },
      {
        type: "code",
        language: "ts",
        filename: "sse.cleanup.ts",
        code: 'req.on("close", () => {\n  connections!.delete(client);\n  if (connections!.size === 0) {\n    clients.delete(userId);\n  }\n});'
      },
      {
        type: "paragraph",
        text: "Skip this and three things go wrong at once: the registry grows without bound, dead sockets accumulate, and the delivery loop starts writing into closed responses. With long-lived connections, cleanup is a correctness requirement, not hygiene."
      },
      {
        type: "heading",
        text: "Redis as the Distribution Layer"
      },
      {
        type: "paragraph",
        text: "Everything so far lives in one process's memory \u2014 which breaks the moment SRVJ runs more than one instance:"
      },
      {
        type: "list",
        items: [
          "Instance A \u2192 User 1 connected",
          "Instance B \u2192 User 2 connected",
          "Instance C \u2192 Worker running"
        ]
      },
      {
        type: "paragraph",
        text: "The worker on instance C has no idea which instance holds user 1's connection \u2014 and it shouldn't have to. Redis Pub/Sub solves the routing problem by never asking it: the worker publishes once, and whichever instance owns the connection delivers. Two Redis clients are needed:"
      },
      {
        type: "code",
        language: "ts",
        filename: "redis.ts",
        code: "export const redis = createClient({ url });\nexport const subscriber = redis.duplicate();"
      },
      {
        type: "paragraph",
        text: "The duplicate isn't optional: a Redis connection in subscriber mode can't issue normal commands anymore, so Pub/Sub gets its own dedicated connection while the original client keeps serving the rest of the application."
      },
      {
        type: "heading",
        text: "Publishing Notifications"
      },
      {
        type: "paragraph",
        text: "After the worker persists the notification in PostgreSQL, it publishes an event."
      },
      {
        type: "code",
        language: "ts",
        filename: "notification.worker.ts",
        code: 'const payload = {\n  id: uuidv4(),\n  sender: data.sender,\n  userId: data.userId,\n  type: data.type,\n  title: data.title,\n  message: data.message,\n  createdAt: new Date().toISOString(),\n};\n\nawait prisma.notification.create({\n  data: {\n    fromUserId: Number(payload.sender),\n    toUserId: Number(payload.userId),\n    title: payload.title,\n    message: payload.message,\n  }\n});\n\nawait redis.publish(\n  "notifications",\n  JSON.stringify(payload)\n);'
      },
      {
        type: "paragraph",
        text: "The ordering is the whole design: persist first, publish second. PostgreSQL is the source of truth \u2014 an offline user finds the notification waiting when they fetch via the REST API, and a crash between the two steps loses only a realtime push, never the notification itself. Flip the order and the failure mode inverts: a user could see a notification that was never stored."
      },
      {
        type: "heading",
        text: "Delivering Notifications to Connected Users"
      },
      {
        type: "paragraph",
        text: "Every application instance subscribes to Redis."
      },
      {
        type: "code",
        language: "ts",
        filename: "sse.subscriber.ts",
        code: 'await subscriber.subscribe(\n  "notifications",\n  (message) => {\n    const payload = JSON.parse(message);\n    const connections = clients.get(\n      String(payload.userId)\n    );\n    if (!connections || connections.size === 0)\n      return;\n\n    const frame =\n      `event: notification\\n` +\n      `data: ${JSON.stringify(payload)}\\n\\n`;\n\n    for (const client of connections) {\n      client.res.write(frame);\n    }\n  }\n);'
      },
      {
        type: "paragraph",
        text: "The elegance is in what each part doesn't need to know:"
      },
      {
        type: "list",
        items: [
          "Each server instance only knows about its local SSE connections.",
          "Redis broadcasts the event to every instance.",
          "Only the instance holding the user's connection actually sends the event."
        ]
      },
      {
        type: "paragraph",
        text: "This architecture allows horizontal scaling without introducing sticky sessions or centralized connection management."
      },
      {
        type: "heading",
        text: "Background Processing with BullMQ"
      },
      {
        type: "paragraph",
        text: "The front of the pipeline matters as much as the delivery end: the API never creates notifications inline. It drops a job on BullMQ and returns."
      },
      {
        type: "code",
        language: "text",
        filename: "notification-flow.txt",
        code: "User Action\n      \u2193\nBullMQ Job\n      \u2193\nWorker\n      \u2193\nDatabase\n      \u2193\nRedis Pub/Sub\n      \u2193\nSSE"
      },
      {
        type: "paragraph",
        text: "The queue buys the usual things, and every one of them matters here:"
      },
      {
        type: "list",
        items: [
          "Prevents request blocking.",
          "Improves API response times.",
          "Supports retries.",
          "Handles transient failures.",
          "Decouples business logic from delivery logic."
        ]
      },
      {
        type: "paragraph",
        text: "A failed notification can be retried without affecting the user's original request."
      },
      {
        type: "heading",
        text: "Hardening for Production"
      },
      {
        type: "paragraph",
        text: "The pipeline above is the version that ships first, and it's deliberately simple. As SRVJ grows past a single instance and starts retrying jobs under load, three refinements matter. None of them change the core idea \u2014 they make it correct at scale."
      },
      {
        type: "heading",
        text: "Scaling the Fan-Out: Per-User Channels",
        level: 3
      },
      {
        type: "paragraph",
        text: "The version above publishes every notification to a single global notifications channel, and every instance subscribes to it. That's the simplest thing that works, and at a small number of instances it's completely fine."
      },
      {
        type: "paragraph",
        text: "But notice what happens as you scale out: every instance receives every notification and then discards the ones it doesn't own. With N instances, roughly (N-1)/N of that fan-out is wasted CPU and network that grows with both notification volume and instance count."
      },
      {
        type: "paragraph",
        text: "The refinement is per-user channels \u2014 notif:user:{id}. Each instance subscribes only to the users currently connected to it, and unsubscribes when the last tab for that user disconnects:"
      },
      {
        type: "code",
        language: "ts",
        filename: "sse.channels.ts",
        code: "// on connect (first tab for this user on this instance)\nawait subscriber.subscribe(`notif:user:${userId}`, handleMessage);\n\n// on disconnect (last tab gone)\nawait subscriber.unsubscribe(`notif:user:${userId}`);"
      },
      {
        type: "paragraph",
        text: "The publish side targets the user directly instead of broadcasting:"
      },
      {
        type: "code",
        language: "ts",
        filename: "notification.worker.ts",
        code: "await redis.publish(`notif:user:${payload.userId}`, JSON.stringify(payload));"
      },
      {
        type: "paragraph",
        text: "Now each instance receives only the messages for users it actually holds."
      },
      {
        type: "paragraph",
        text: "Tradeoffs. You trade a fixed broadcast cost for subscribe/unsubscribe churn on every connect and disconnect, plus many short-lived channels in Redis. That's a good trade once instance count and notification volume grow; the single global channel is fine while you're small. Pick the per-user model the moment you horizontally scale the app tier in earnest."
      },
      {
        type: "heading",
        text: "Idempotent Worker Writes",
        level: 3
      },
      {
        type: "paragraph",
        text: "BullMQ delivers at-least-once. A worker that crashes after writing to PostgreSQL but before acking the job will see that job again on restart \u2014 and a blind create produces a duplicate notification."
      },
      {
        type: "paragraph",
        text: "The fix is a stable dedup key (the domain eventId, or a deterministic hash of type + sender + recipient + target) plus a unique constraint, so the second delivery becomes a no-op instead of a duplicate:"
      },
      {
        type: "code",
        language: "ts",
        filename: "notification.worker.ts",
        code: "await prisma.notification.upsert({\n  where: { eventId: payload.eventId },\n  update: {},\n  create: {\n    eventId: payload.eventId,\n    fromUserId: Number(payload.sender),\n    toUserId: Number(payload.userId),\n    title: payload.title,\n    message: payload.message,\n  },\n});"
      },
      {
        type: "paragraph",
        text: "Tradeoff. You need a deterministic key and a unique column \u2014 a little schema discipline. And worth being honest: exactly-once across queue \u2192 DB \u2192 Redis doesn't really exist. Idempotent writes are how you approximate it, and they're non-negotiable the moment the consumer has side effects."
      },
      {
        type: "heading",
        text: "Surviving Reconnections",
        level: 3
      },
      {
        type: "paragraph",
        text: "SSE auto-reconnects, but Redis Pub/Sub has no buffer: anything published while a client was disconnected is simply gone. Two ways to close that gap:"
      },
      {
        type: "list",
        items: [
          "Refetch on reconnect \u2014 When EventSource fires onopen, the client calls the REST list endpoint (GET /notifications) to reconcile against PostgreSQL. This needs nothing extra and is the pragmatic default for SRVJ.",
          "Last-Event-ID replay \u2014 On reconnect the browser sends the Last-Event-ID header automatically, and the server replays what was missed. This requires a durable per-user log to replay from \u2014 which pushes you toward Redis Streams."
        ]
      },
      {
        type: "paragraph",
        text: "For SRVJ, the refetch path wins: the durable store already exists, so the realtime layer is free to be lossy."
      },
      {
        type: "heading",
        text: "Pub/Sub vs Redis Streams"
      },
      {
        type: "paragraph",
        text: "Redis Pub/Sub is fire-and-forget \u2014 no subscriber connected at publish time means the message is dropped, with no replay and no acknowledgement. That's acceptable here precisely because the REST list reconciles anything lost."
      },
      {
        type: "paragraph",
        text: 'If you ever need "no notification missed in realtime, even across reconnects, without a refetch," move the channel to Redis Streams (XADD + consumer groups + XACK). You get at-least-once delivery and replay via XRANGE, at the cost of a trimming policy (MAXLEN), consumer-group bookkeeping, and more memory. Reach for it only when the refetch model stops being good enough \u2014 not before.'
      },
      {
        type: "heading",
        text: "Why I Chose SSE"
      },
      {
        type: "paragraph",
        text: "For server-generated notifications, SSE provided:"
      },
      {
        type: "list",
        items: [
          "Native browser support.",
          "Automatic reconnection.",
          "Simple architecture.",
          "Lower operational complexity.",
          "Lightweight server-to-client communication.",
          "Seamless integration with existing HTTP infrastructure."
        ]
      },
      {
        type: "paragraph",
        text: "SSE is not a replacement for WebSockets, but for notification delivery in SRVJ, it turned out to be the right tool for the job."
      },
      {
        type: "paragraph",
        text: "Next in the series: How CRDTs and Yjs power collaborative editing in SRVJ."
      }
    ]
  },
  {
    id: 2,
    slug: "paymob-amazon-payment-services-integration",
    ogImage: "/og/blog-paymob-amazon-payment-services-integration.png",
    title: "PayMob & Amazon Payment Services: What the Docs Don't Cover",
    excerpt: "Months of integrating PayMob and Amazon Payment Services (PayFort) into a production marketplace, distilled \u2014 the provider adapter, the payment state machine, the verify-then-enqueue webhook pipeline, and the reconciliation job that catches everything else.",
    metaTitle: "PayMob & Amazon Payment Services (PayFort) Integration",
    metaDescription: "Integrating PayMob and Amazon Payment Services (PayFort) in production \u2014 the adapter pattern, payment state machine, webhook pipeline and reconciliation.",
    category: "Payment Integration",
    date: "2026-06-12",
    updated: "2026-07-09",
    readTime: "12 min read",
    tags: ["Payments", "Paymob", "Amazon Payment Services", "PayFort", "Webhooks", "BullMQ", "Node.js", "TypeScript"],
    entities: [
      { name: "Paymob", sameAs: "https://paymob.com" },
      { name: "Amazon Payment Services", sameAs: "https://paymentservices.amazon.com" },
      { name: "Webhook", sameAs: "https://en.wikipedia.org/wiki/Webhook" },
      { name: "HMAC", sameAs: "https://en.wikipedia.org/wiki/HMAC" },
      { name: "Idempotence", sameAs: "https://en.wikipedia.org/wiki/Idempotence" }
    ],
    relatedSlugs: ["jwt-vs-paseto-tokens"],
    blocks: [
      {
        type: "paragraph",
        text: "I've spent the last few months integrating two payment providers into a production marketplace: PayMob and Amazon Payment Services (the thing everyone still calls PayFort). The docs got me to my first sandbox transaction in an afternoon. Everything after that, I had to figure out the hard way."
      },
      {
        type: "paragraph",
        text: `So this post is the writeup I wish existed when I started. It's not "how to call the PayMob API" \u2014 there are ten of those already and they all stop right before the part that hurts. This is about the architecture that sits between your Express app and two providers that disagree on basically everything.`
      },
      {
        type: "paragraph",
        text: "Fair warning: this assumes you're a backend engineer who's shipped things before. I'm not going to explain what a webhook is."
      },
      {
        type: "heading",
        text: "Two providers, one interface (or: how I stopped writing if-statements)"
      },
      {
        type: "paragraph",
        text: "My first version had `if (provider === 'paymob')` checks scattered around. It worked for about two weeks. Then I needed refunds, and the branching got ugly fast, because these two providers genuinely agree on nothing:"
      },
      {
        type: "list",
        items: [
          "PayMob auth is a three-step dance \u2014 authenticate, create an order, get a payment key. APS signs every single request with a signature you compute over the sorted request params plus a passphrase.",
          "PayMob webhooks come with an HMAC computed over a very specific ordering of fields concatenated together. APS sends a signature you recompute yourself with the same sorted-params scheme.",
          "PayMob wants amounts in piasters. APS wants the amount multiplied by the currency's decimal factor, which is different per currency. Yes, I got this wrong once.",
          '"Success" in PayMob is a boolean and a transaction object. In APS it\'s a numeric response code where the `14xxx` family means success and everything else means go check the table.'
        ]
      },
      {
        type: "paragraph",
        text: "So I pulled everything behind one internal interface: create intent, capture, refund, verify webhook, normalize status. One adapter per provider. The rest of the codebase has no idea PayMob exists."
      },
      {
        type: "paragraph",
        text: "The payoff came faster than expected. APS merchant accounts are scoped to a single currency \u2014 something I learned when an EGP transaction went through a USD-configured account and failed in a way that made zero sense. The fix lived entirely inside the APS adapter. Nothing else in the system changed. That's the whole argument for the pattern, honestly."
      },
      {
        type: "paragraph",
        text: "The catch: the shared interface is a lowest common denominator. PayMob has installment stuff, APS has tokenization quirks, and neither maps cleanly. You either keep growing the interface (it gets bloated) or you add a providerOptions passthrough and accept the leak. I went with the leak. A documented escape hatch beats pretending two different products are the same product."
      },
      {
        type: "heading",
        text: "Payments are state machines whether you like it or not"
      },
      {
        type: "paragraph",
        text: "Early on, payment status was just a string field that any code path could update. Then a late PayMob retry arrived after my expiry job had already marked an intent as expired, flipped it back to success, and I spent an evening figuring out why an expired payment had sent a confirmation email."
      },
      {
        type: "paragraph",
        text: "Now every intent goes through an actual state machine:"
      },
      {
        type: "code",
        language: "mermaid",
        filename: "payment-intent-states.mmd",
        code: "stateDiagram-v2\n    [*] --> CREATED\n    CREATED --> PENDING: redirect to provider\n    PENDING --> PROCESSING: webhook received\n    PROCESSING --> SUCCEEDED: verified success\n    PROCESSING --> FAILED: verified failure\n    PENDING --> EXPIRED: TTL exceeded\n    SUCCEEDED --> REFUND_PENDING: refund requested\n    REFUND_PENDING --> REFUNDED: refund confirmed\n    REFUND_PENDING --> SUCCEEDED: refund rejected\n    FAILED --> [*]\n    EXPIRED --> [*]\n    REFUNDED --> [*]"
      },
      {
        type: "paragraph",
        text: "The rule is simple: transitions get validated at write time, with an atomic compare-and-set on the current state. A FAILED intent can't become SUCCEEDED no matter what shows up. An EXPIRED intent rejects everything. When two writers race \u2014 say, a webhook handler and a reconciliation job hitting the same intent milliseconds apart \u2014 the loser gets a rejected transition instead of silently winning by being last."
      },
      {
        type: "paragraph",
        text: "A status field describes. A state machine enforces. That's the difference, and it only matters in exactly the moments when everything else is going wrong, which is exactly when you need it."
      },
      {
        type: "paragraph",
        text: "The annoying part: now you have to handle legitimate out-of-order events explicitly. Under load, APS can deliver an authorization webhook after the capture webhook. The state machine forces you to sit down and decide what that means instead of letting the last write win. More design work up front. Way fewer 2 AM surprises."
      },
      {
        type: "heading",
        text: "Webhooks: do almost nothing, fast"
      },
      {
        type: "paragraph",
        text: "Here's the mistake I see in nearly every integration tutorial: the webhook handler verifies the signature, updates the database, sends an email, updates inventory, and then returns 200. If anything in that chain is slow or throws, the provider retries, and now you've processed the same payment twice. And PayMob retries aggressively. It will not be polite about it."
      },
      {
        type: "paragraph",
        text: "What actually works:"
      },
      {
        type: "code",
        language: "mermaid",
        filename: "webhook-pipeline.mmd",
        code: "sequenceDiagram\n    participant P as Provider (PayMob / APS)\n    participant W as Webhook Endpoint\n    participant Q as BullMQ Queue\n    participant J as Worker\n    participant DB as MongoDB\n    participant L as Ledger\n\n    P->>W: POST webhook payload\n    W->>W: Verify HMAC / signature (raw body)\n    alt invalid signature\n        W-->>P: 401\n    else valid\n        W->>Q: Enqueue, jobId = provider txn id\n        W-->>P: 200 within milliseconds\n    end\n    Q->>J: Deliver job (deduped by jobId)\n    J->>DB: Atomic state transition\n    alt transition valid\n        J->>L: Append ledger entry\n        J->>Q: Enqueue side effects (email, inventory)\n    else transition invalid\n        J->>J: Log it, drop it\n    end"
      },
      {
        type: "paragraph",
        text: "The endpoint does two things: cryptographic verification and enqueueing. That's it. Everything else happens in a BullMQ worker."
      },
      {
        type: "paragraph",
        text: "Verification stays synchronous and happens against the raw body, before you trust a single field in the payload. If you enqueue unverified payloads, congratulations, your queue is now an attack surface."
      },
      {
        type: "paragraph",
        text: "The trick I like most here: use the provider's transaction ID as the BullMQ job ID. BullMQ dedupes jobs with the same ID, so PayMob's retry storm collapses into one job before your handler logic even runs. Idempotency at the queue layer, basically free."
      },
      {
        type: "paragraph",
        text: 'There is a real cost, though. Returning 200 now means "received and verified," not "processed." If the worker dies permanently, the provider walks away believing delivery succeeded, and nobody retries anything. That gap is exactly why reconciliation exists \u2014 more on that below. I considered going back to synchronous processing once or twice, but coupling your webhook response time to your slowest side effect is a worse deal in every scenario I could come up with.'
      },
      {
        type: "heading",
        text: "The outbound side: don't trust your own retries either"
      },
      {
        type: "paragraph",
        text: "Webhooks cover inbound duplicates. But your own server retrying a capture or refund after a timeout is just as dangerous, and nobody talks about it."
      },
      {
        type: "paragraph",
        text: "The scenario: you call the APS refund API, it times out. Did the refund go through? You genuinely don't know. Their behavior under timeout is ambiguous. Retry blindly and you might refund twice \u2014 and explaining a double refund to finance is a conversation I'd like to never have."
      },
      {
        type: "paragraph",
        text: `So before any provider call, I write an operation record keyed by a deterministic idempotency key: intent ID plus operation type plus attempt scope. The retry path checks that record first, then queries the provider for the operation's actual status before re-issuing anything. It turns "did I just double-refund someone" from a panic into a database query.`
      },
      {
        type: "paragraph",
        text: "Cost: more writes, more state, and you need a cleanup policy for stale records. Cheap insurance."
      },
      {
        type: "heading",
        text: "The ledger, or: your database will lie to you eventually"
      },
      {
        type: "paragraph",
        text: 'The intent record answers "what is the state right now." It cannot answer "what happened, in what order, according to whom." For that I keep an append-only ledger \u2014 every event is a new immutable row referencing the intent. Webhook received? Row. Transition applied? Row. Reconciliation corrected something? Row, tagged as such.'
      },
      {
        type: "paragraph",
        text: "The first time PayMob's dashboard and my database disagreed about a transaction, the ledger was how I reconstructed what actually happened. Mutable state tells you where you ended up. The ledger tells you how you got there. It's also the thing your finance team actually wants when they audit \u2014 not the current status, the history."
      },
      {
        type: "paragraph",
        text: "And no, the provider's dashboard doesn't replace this. Providers prune, paginate, and occasionally revise their own records. The ledger is the only record you control."
      },
      {
        type: "paragraph",
        text: `Could I have gone full event sourcing and derived all state from events? Sure. But replaying events to answer "what's the current status" is a lot of machinery for a payments subsystem. The hybrid \u2014 intent record for current state, ledger for history \u2014 is the pragmatic middle ground, and I haven't regretted it.`
      },
      {
        type: "heading",
        text: "Reconciliation: the job that catches everyone else's mistakes"
      },
      {
        type: "paragraph",
        text: "Every layer above has some narrow failure window. A webhook lost after the 200. A worker crash mid-transition. The provider revising a status on their side. Reconciliation is the scheduled job that sweeps up after all of them:"
      },
      {
        type: "list",
        items: [
          "Pull intents stuck in non-terminal states past a threshold.",
          "Hit the provider's transaction inquiry API for ground truth.",
          "Apply corrections through the state machine \u2014 no backdoors, corrections are transitions like everything else.",
          "Write a ledger entry tagged as reconciliation-sourced.",
          "Alert on anything it can't resolve on its own."
        ]
      },
      {
        type: "paragraph",
        text: "Why pull-based inquiry instead of trusting webhook retries? Because webhook delivery is at-least-once in theory and at-most-once whenever the provider is having a bad day. The inquiry API doesn't depend on their delivery infrastructure being healthy."
      },
      {
        type: "paragraph",
        text: "Two things to watch. Inquiry APIs are rate-limited, so the job needs cursor pagination and backoff \u2014 don't hammer them. And the sneaky one: reconciliation can mask upstream bugs. If it's quietly fixing hundreds of intents a day, your webhook pipeline is broken and the job is hiding the evidence. I track the correction rate as a health metric. The day it spikes, something upstream broke."
      },
      {
        type: "heading",
        text: "The stuff that actually bit me"
      },
      {
        type: "paragraph",
        text: "Quick field notes, because every comparison post out there stops at a pricing table:"
      },
      {
        type: "list",
        items: [
          "PayMob's HMAC field ordering \u2014 the HMAC is computed over a specific concatenation of fields, including booleans serialized as lowercase strings. Get one field wrong and every webhook fails verification with an error message that tells you absolutely nothing. I lost real hours to this.",
          "APS currency-scoped merchant accounts \u2014 one account, one currency. Multi-currency means multiple accounts and routing logic in your adapter. Find this out before launch. I almost didn't.",
          "Refunds are where the bugs live \u2014 PayMob refunds reference the original transaction directly. APS refunds are brand-new operations with their own signature computation and their own response-code space. Whatever time you budgeted for refund testing, double it.",
          "Both sandboxes lie, differently \u2014 APS sandbox response codes don't cover the full production failure space. PayMob's sandbox webhook timing is much gentler than production retry behavior. Fire synthetic duplicate webhooks at your own endpoint before going live \u2014 production will do it for you otherwise, at a worse time."
        ]
      },
      {
        type: "heading",
        text: "Wrapping up"
      },
      {
        type: "paragraph",
        text: "Nothing here is exotic. Adapters, state machines, queues, ledgers, a reconciliation job \u2014 you've seen all of these before. What took me a while to internalize is that payments need all of them at once, because each one covers a failure mode the others can't reach. Skip the adapter and provider quirks spread through your codebase. Skip the state machine and races corrupt your data. Skip verify-then-enqueue and retries double-process. Skip the ledger and you can't audit anything. Skip reconciliation and every gap above turns into silent data loss."
      },
      {
        type: "paragraph",
        text: "Build all five and something nice happens: PayMob and APS stop being a source of incidents and become what payment infrastructure should be \u2014 boring."
      },
      {
        type: "paragraph",
        text: "If you've integrated either of these and hit something I didn't cover, I'd genuinely like to hear about it."
      }
    ]
  },
  {
    id: 1,
    slug: "jwt-vs-paseto-tokens",
    ogImage: "/og/blog-jwt-vs-paseto-tokens.png",
    title: "JWT vs PASETO: Choosing the Right Token for the Job",
    excerpt: "I shipped JWT in production, got burned, and switched to PASETO for auth and payments \u2014 but the real lesson is token taxonomy: signed vs encrypted vs opaque, and which job each one actually belongs to.",
    metaTitle: "JWT vs PASETO: Choosing the Right Token Type",
    metaDescription: "JWT vs PASETO for auth and payments \u2014 signed vs encrypted vs opaque tokens, algorithm safety, revocation, and picking the right token type for each job.",
    category: "Backend Security",
    date: "2026-05-12",
    updated: "2026-07-09",
    readTime: "14 min read",
    tags: ["Security", "JWT", "PASETO", "Auth", "Tokens", "Node.js", "TypeScript"],
    entities: [
      { name: "JSON Web Token", sameAs: ["https://en.wikipedia.org/wiki/JSON_Web_Token", "https://datatracker.ietf.org/doc/html/rfc7519"] },
      { name: "PASETO", sameAs: ["https://paseto.io", "https://github.com/paseto-standard/paseto-spec"] },
      { name: "EdDSA", sameAs: "https://en.wikipedia.org/wiki/EdDSA" },
      { name: "Authenticated encryption", sameAs: "https://en.wikipedia.org/wiki/Authenticated_encryption" }
    ],
    relatedSlugs: ["paymob-amazon-payment-services-integration"],
    blocks: [
      {
        type: "paragraph",
        text: "Let me be upfront about something: the way I handle tokens in my own backends is not what most teams do. I use PASETO for both auth and payment tokens. Most of the industry uses JWT for everything. This post is my honest take on why I made that switch, what the real tradeoffs are, and \u2014 more importantly \u2014 what token format you choose matters far less than whether you are using the right type of token for the job at all."
      },
      {
        type: "paragraph",
        text: "This is my opinion. JWT is not wrong. If your team is already on JWT, uses a maintained library, and has proper algorithm enforcement in place, you are fine. I am not here to tell you to migrate. I am here to explain the reasoning behind my choices and let you decide if any of it applies to your situation."
      },
      {
        type: "heading",
        text: "First, understand what you are actually issuing"
      },
      {
        type: "paragraph",
        text: "A token is a portable claim. You encode some data, sign or encrypt it, hand it to a client, and trust it when you see it again \u2014 without calling a database. That last part is why tokens are so appealing. It is also why they cause so much damage when misused."
      },
      {
        type: "paragraph",
        text: 'There are three fundamentally different things people call "tokens" and they are not interchangeable:'
      },
      {
        type: "list",
        items: [
          "Signed tokens \u2014 the payload is readable by anyone. You are only proving it was not tampered with. JWT (JWS) and PASETO v4.public both fall here.",
          "Encrypted tokens \u2014 the payload is hidden. Only someone with the key can read it. JWE and PASETO v4.local fall here.",
          "Opaque tokens \u2014 a random string with no embedded claims. You must hit a database to know what it means."
        ]
      },
      {
        type: "paragraph",
        text: "Most developers only know the first category. That is the root of every token security problem I have seen."
      },
      {
        type: "heading",
        text: "JWT \u2014 what it actually does well"
      },
      {
        type: "paragraph",
        text: "JWT is everywhere because it genuinely solved a real problem at the right moment. When OAuth 2.0 and OpenID Connect became the standard handshake between services, having a universal, self-describing token format was essential. Every API gateway, every identity provider, every load balancer, every auth library in every language understands JWT. That interoperability is not something you throw away lightly \u2014 and for most teams, it is the reason JWT is the correct default."
      },
      {
        type: "paragraph",
        text: "Asymmetric JWT \u2014 signed with ES256 specifically \u2014 works well for distributed systems. Your auth service holds the private key and signs tokens. Every other service holds the public key and verifies them. No shared secret, no service-to-service trust dependency. The JWKS endpoint makes public key discovery and rotation automatic. This is a genuinely well-designed system."
      },
      {
        type: "list",
        items: [
          "Universal support \u2014 OAuth, OIDC, AWS Cognito, Auth0, Okta, every API gateway. JWT is the lingua franca and that matters.",
          "Asymmetric signing \u2014 services verify without holding the signing key.",
          "JWKS \u2014 automatic public key discovery and rotation over HTTP. Nothing in the PASETO world has an equivalent.",
          "Standardised claims \u2014 iss, sub, aud, exp, iat, jti. Every library validates them.",
          "Tooling \u2014 jwt.io, debug middleware, framework plugins. Fifteen years of ecosystem depth."
        ]
      },
      {
        type: "heading",
        text: "JWT \u2014 where it gets teams into trouble"
      },
      {
        type: "paragraph",
        text: "The JWT spec made one decision that has caused an outsized amount of damage: the signing algorithm is declared inside the token header, by the client. The server is supposed to enforce its own expected algorithm. In practice, many libraries historically did not do that by default. The result was the alg: none attack and the algorithm confusion attack \u2014 both of which should not have been possible if the spec had made different choices."
      },
      {
        type: "paragraph",
        text: "These vulnerabilities are largely a 2015 story if you are using a maintained library today. But the underlying design is still there. Algorithm safety in JWT is a code review discipline. You need to remember to set the algorithms allowlist. You need to review every new developer's auth middleware. You need library upgrades to not introduce regressions. It is manageable \u2014 most production JWT systems are fine \u2014 but it is discipline-dependent rather than structurally enforced."
      },
      {
        type: "list",
        items: [
          "alg: none attack \u2014 declare no algorithm, strip the signature, submit. Fixed in modern libraries but the design is still a footgun.",
          'Algorithm confusion \u2014 RS256 server tricked into accepting HS256 where the "secret" is the public key. Same root cause.',
          "Sensitive payload \u2014 JWT is signed, not encrypted. The payload is base64url. Anyone who intercepts the token reads your claims. This is the one that surprises junior developers the most.",
          'Long expiry \u2014 access tokens set to 24 hours or more because "users hate logging in". Irrevocable without a blocklist you never built.'
        ]
      },
      {
        type: "code",
        language: "ts",
        filename: "jwt.what-not-to-do.ts",
        code: '// Real mistakes I have seen in production codebases.\n\n// 1. No algorithm enforcement\njwt.verify(token, secret)\n// The library accepts whatever alg the token header claims.\n\n// 2. Reading claims before verification\nconst { userId } = JSON.parse(\n  Buffer.from(token.split(".")[1], "base64url").toString()\n)\n// You just trusted an unverified token.\n\n// 3. Sensitive data in a signed (not encrypted) token\njwt.sign({ userId, email, plan: "enterprise", cardLastFour: "4242" }, secret)\n// base64url is not encryption. Anyone with the token reads this.\n\n// 4. HS256 with a weak secret\nconst secret = process.env.JWT_SECRET ?? "dev-secret"\n// Offline brute-forceable from any captured token.\n'
      },
      {
        type: "paragraph",
        text: "The correct version of JWT auth is not complicated \u2014 it just requires deliberate choices:"
      },
      {
        type: "code",
        language: "ts",
        filename: "jwt.done-right.ts",
        code: `import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'

const privateKey = readFileSync("./keys/ec-private.pem")
const publicKey  = readFileSync("./keys/ec-public.pem")

export interface AuthTokenPayload {
  sub:       string
  role:      string
  sessionId: string
  jti:       string
}

export function signAuthToken(payload: Omit<AuthTokenPayload, "jti">): string {
  return jwt.sign(
    { ...payload, jti: crypto.randomUUID() },
    privateKey,
    {
      algorithm: "ES256",
      expiresIn:  "15m",
      issuer:    "api.example.com",
      audience:  "web-client",
    }
  )
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, publicKey, {
    algorithms: ["ES256"],   // allowlist \u2014 this line is mandatory
    issuer:    "api.example.com",
    audience:  "web-client",
  }) as AuthTokenPayload
}
`
      },
      {
        type: "heading",
        text: "PASETO \u2014 why I switched and what it actually fixes"
      },
      {
        type: "paragraph",
        text: "I want to be clear: I use PASETO in my own stack. This is not the industry standard and I am not claiming it should be. Most production systems run JWT and they are fine. But when I was building a backend where I controlled every service end to end, I chose PASETO for auth and payments \u2014 and here is why."
      },
      {
        type: "paragraph",
        text: "The version and purpose are baked into the token prefix \u2014 v4.public, v4.local. A server that calls V4.verify() will only ever process a v4.public token signed with Ed25519. There is no alg field. There is no negotiation. You cannot misconfigure it into an algorithm confusion vulnerability because the footgun literally does not exist in the API. That is the structural guarantee JWT cannot give you."
      },
      {
        type: "paragraph",
        text: "For auth tokens I use PASETO v4.public \u2014 Ed25519 signed. It is faster than RSA, the keys are smaller, and the API has one right way to use it. For payment tokens I use PASETO v4.local \u2014 XChaCha20-Poly1305 encrypted. Real encryption, not base64. The implicit assertion feature lets me bind the token to the authenticated user ID at the encryption layer, not just as a claim in the payload."
      },
      {
        type: "list",
        items: [
          "Algorithm safety by design \u2014 version prefix is the algorithm contract. No runtime negotiation, no discipline required.",
          "v4.public uses Ed25519 \u2014 faster than RS256, smaller keys than RSA-2048, same asymmetric trust model.",
          "v4.local = real encryption \u2014 XChaCha20-Poly1305 authenticated encryption. Payload is ciphertext, not encoded text.",
          "Implicit assertions \u2014 bind a token cryptographically to external context without embedding it in the payload.",
          "Simpler API \u2014 fewer options means fewer wrong choices."
        ]
      },
      {
        type: "code",
        language: "ts",
        filename: "paseto.auth.ts",
        code: `import { V4 } from 'paseto'

// const { secretKey, publicKey } = await V4.generateKey("public", { format: "paserk" })

const secretKey = process.env.PASETO_SECRET_KEY!
const publicKey = process.env.PASETO_PUBLIC_KEY!

export interface AuthTokenPayload {
  sub:       string
  role:      string
  sessionId: string
}

export async function signAuthToken(
  payload: AuthTokenPayload
): Promise<string> {
  return V4.sign(
    { ...payload, iss: "api.example.com", aud: "web-client" },
    secretKey,
    { expiresIn: "15 minutes" }
  )
}

export async function verifyAuthToken(
  token: string
): Promise<AuthTokenPayload> {
  const payload = await V4.verify(token, publicKey, {
    issuer:         "api.example.com",
    audience:       "web-client",
    clockTolerance: "1 minute",
  })
  return payload as AuthTokenPayload
}
`
      },
      {
        type: "heading",
        text: "PASETO \u2014 the honest reasons most teams do not use it"
      },
      {
        type: "paragraph",
        text: "The technical case for PASETO is solid. The adoption reality is not. The main reason most teams stay on JWT has nothing to do with JWT being better \u2014 it is ecosystem lock-in. OAuth 2.0, OpenID Connect, AWS Cognito, Auth0, Okta, every API gateway and third-party identity provider speaks JWT. None of them speak PASETO. If you need to integrate with any of those, you are using JWT whether you like it or not."
      },
      {
        type: "paragraph",
        text: "The other barrier is that PASETO is simply not well known. Most developers learned tokens through JWT tutorials. They have never heard of PASETO. The ecosystem is smaller, the tooling is thinner, and when something breaks in production at 2am there are fewer Stack Overflow answers. That is a real cost."
      },
      {
        type: "list",
        items: [
          "No OAuth / OIDC support \u2014 every major IdP speaks JWT. If you need third-party auth integration, PASETO is not an option.",
          "No JWKS equivalent \u2014 public key discovery is something you build yourself. JWT solved this years ago.",
          "v4.local key distribution \u2014 symmetric key needs to reach every decrypting service. Wider key distribution = wider blast radius.",
          "Small ecosystem \u2014 fewer libraries, fewer developers with production experience, less tooling.",
          "Switching cost \u2014 teams already on JWT have working systems. Migrating for a structural improvement is a hard sell."
        ]
      },
      {
        type: "paragraph",
        text: "I use PASETO because I built systems from scratch where I controlled every service and had no third-party IdP requirements. If your situation is different \u2014 and for most teams it is \u2014 JWT done properly is the right call."
      },
      {
        type: "heading",
        text: "The more important conversation \u2014 token taxonomy"
      },
      {
        type: "paragraph",
        text: "JWT vs PASETO is honestly the less interesting debate. The damage I see most often in production is not teams using the wrong format \u2014 it is teams using the right format for the wrong job. A signed stateless token used where an opaque revocable one was needed. That mistake costs you regardless of whether the token is JWT or PASETO."
      },
      {
        type: "heading",
        text: "Auth tokens \u2014 short-lived, asymmetrically signed",
        level: 3
      },
      {
        type: "paragraph",
        text: "I use PASETO v4.public here. Most teams use JWT ES256. Both are valid if done correctly \u2014 15 minutes maximum, asymmetric signing, no sensitive data in the payload, a jti for revocation. The difference is structural vs disciplinary algorithm safety. Pick whichever fits your stack."
      },
      {
        type: "list",
        items: [
          "JWT ES256 if you need OAuth / OIDC / third-party IdP integration.",
          "PASETO v4.public if you own the full stack and want algorithm safety by construction.",
          "15 minute expiry. Not one hour. Not one day.",
          "Payload: sub, role, sessionId. Nothing you would be embarrassed to see in a log."
        ]
      },
      {
        type: "heading",
        text: "Refresh tokens \u2014 opaque, always",
        level: 3
      },
      {
        type: "paragraph",
        text: "This one is not a matter of opinion. Refresh tokens should not be JWT. They should not be PASETO. They should be a cryptographically random string stored as a hashed row in your database. The entire point of a refresh token is that you can revoke it. A stateless token cannot be revoked without a blocklist, and if you need a blocklist you have already defeated the purpose of going stateless. Use the database."
      },
      {
        type: "code",
        language: "ts",
        filename: "refresh-token.service.ts",
        code: `import crypto from 'crypto'

export function generateRefreshToken() {
  const raw    = crypto.randomBytes(48).toString("base64url")
  const hashed = crypto.createHash("sha256").update(raw).digest("hex")
  return { raw, hashed }
  // Store hashed in DB. Send raw to client via HttpOnly Secure cookie.
  // You will never see the raw value again \u2014 just like a password.
}

// On rotation: delete the old row, insert a new one.
// If a rotated token comes back in, that is a replay \u2014 revoke the session immediately.
`
      },
      {
        type: "heading",
        text: "Payment tokens \u2014 encrypted, always",
        level: 3
      },
      {
        type: "paragraph",
        text: "This is where I feel most strongly. Payment tokens carry order amounts, PSP card tokens, idempotency keys, merchant references. They should be encrypted \u2014 not signed. Most teams sign a JWT with the payment details in the payload and call it done. That payload is base64url. It is not encrypted. Anyone who captures that token in transit, in a log, or in a browser history can read exactly what is in it."
      },
      {
        type: "paragraph",
        text: "I use PASETO v4.local here. The payload is XChaCha20-Poly1305 encrypted. Only the payment service holds the symmetric key. The implicit assertion binds the token to the authenticated user ID at the encryption layer \u2014 not as a claim in the payload, but mixed into the encryption itself. If someone extracts a payment token and tries to use it in a different user's session, the decryption fails. Not an authorization check that can be bypassed \u2014 a cryptographic failure."
      },
      {
        type: "paragraph",
        text: "To be honest: most backends do not need this level of precision. But payment data is the highest-value target in most systems and the cost of doing it properly is low once you understand the API."
      },
      {
        type: "code",
        language: "ts",
        filename: "payment-token.service.ts",
        code: `import { V4 } from 'paseto'

// This key lives ONLY in the payment service.
// Not in the API gateway. Not in the order service. Only here.
const paymentKey = process.env.PASETO_PAYMENT_LOCAL_KEY!

export interface PaymentTokenPayload {
  orderId:        string
  userId:         string
  amount:         number
  currency:       string
  pspCardToken:   string  // PSP-issued token. Not the raw card number. Ever.
  idempotencyKey: string
}

export async function issuePaymentToken(
  payload: PaymentTokenPayload
): Promise<string> {
  return V4.encrypt(
    { ...payload, iss: "payment-service", aud: "payment-service" },
    paymentKey,
    {
      expiresIn: "5 minutes",
      // Mixed into the encryption \u2014 not a payload claim.
      // Wrong userId = cryptographic failure, not an authorization check.
      assertion: Buffer.from(payload.userId),
    }
  )
}

export async function consumePaymentToken(
  token:  string,
  userId: string  // from the verified auth token
): Promise<PaymentTokenPayload> {
  const payload = await V4.decrypt(token, paymentKey, {
    issuer:    "payment-service",
    audience:  "payment-service",
    assertion: Buffer.from(userId),
  })
  return payload as PaymentTokenPayload
}
`
      },
      {
        type: "heading",
        text: "API keys \u2014 prefixed opaque strings",
        level: 3
      },
      {
        type: "paragraph",
        text: "API keys need to be revocable instantly. That requires a database row. Stripe figured this out years ago \u2014 a prefixed random string (sk_live_, sk_test_), shown once, stored hashed, looked up on every request. Not clever, but correct. JWT and PASETO are the wrong tools here."
      },
      {
        type: "code",
        language: "ts",
        filename: "api-key.service.ts",
        code: `import crypto from 'crypto'

type KeyEnv = 'live' | 'test'

export function generateApiKey(env: KeyEnv) {
  const prefix = env === "live" ? "sk_live" : "sk_test"
  const secret = crypto.randomBytes(32).toString("base64url")
  const raw    = \`\${prefix}_\${secret}\`
  const hashed = crypto.createHash("sha256").update(raw).digest("hex")
  // Store: { hashed, prefix, scopes, createdAt, lastUsedAt }
  // Return raw once. After this moment it is gone from your system.
  return { raw, hashed, prefix }
}

export async function verifyApiKey(
  raw: string,
  db: { findByHash: (h: string) => Promise<{ scopes: string[] } | null> }
) {
  const hashed = crypto.createHash("sha256").update(raw).digest("hex")
  const record = await db.findByHash(hashed)
  if (!record) throw new Error("Invalid API key")
  return record
}
`
      },
      {
        type: "heading",
        text: "Email verification and password reset \u2014 also opaque",
        level: 3
      },
      {
        type: "paragraph",
        text: 'I have seen teams use JWT for password reset links. The argument is "stateless, no database needed." The problem: if a user requests five reset emails, all five tokens are valid until exp. No single-use enforcement, no way to invalidate them when the password changes, no way to expire them early. A random string in a database row, deleted on use. That is it.'
      },
      {
        type: "list",
        items: [
          "32 bytes of crypto.randomBytes, stored hashed in the DB.",
          "Expiry in the DB row, not the token. You can change it without reissuing.",
          "Delete on successful use. Single-use by default.",
          "Rate-limit issuance \u2014 one per user per 5 minutes at minimum."
        ]
      },
      {
        type: "heading",
        text: "Revocation \u2014 neither format solves this"
      },
      {
        type: "paragraph",
        text: "A stateless token is valid until exp. JWT or PASETO \u2014 makes no difference. A user logs out, changes their password, gets suspended \u2014 the token does not care. The pragmatic answer is a Redis blocklist keyed by jti with a TTL equal to the token's remaining lifetime. One sub-millisecond read per request. Acceptable cost for real-time revocation."
      },
      {
        type: "code",
        language: "ts",
        filename: "token-blocklist.ts",
        code: 'import { Redis } from \'ioredis\'\n\nconst redis = new Redis(process.env.REDIS_URL!)\n\nexport async function revokeToken(\n  jti:       string,\n  expiresAt: number\n): Promise<void> {\n  const ttl = expiresAt - Math.floor(Date.now() / 1000)\n  if (ttl > 0) {\n    await redis.set(`bl:${jti}`, "1", "EX", ttl)\n  }\n}\n\nexport async function isRevoked(jti: string): Promise<boolean> {\n  return (await redis.exists(`bl:${jti}`)) === 1\n}\n'
      },
      {
        type: "heading",
        text: "The decision matrix"
      },
      {
        type: "list",
        items: [
          "Auth / access token \u2192 PASETO v4.public (my choice) or JWT ES256 (industry standard). 15 min. Both valid.",
          "Refresh token \u2192 Opaque random string, hashed in DB. Not negotiable.",
          "Payment token \u2192 PASETO v4.local (my choice). Encrypted, 5 min, implicit assertion. Most teams use signed JWT \u2014 that is the weaker option.",
          "API key \u2192 Prefixed opaque string, hashed in DB. Revocable, scoped, shown once.",
          "Email verification / password reset \u2192 Opaque random string, hashed in DB. Delete on use.",
          "Service-to-service \u2192 JWT ES256 with short expiry and explicit aud per target service."
        ]
      },
      {
        type: "heading",
        text: "What I actually think"
      },
      {
        type: "paragraph",
        text: "JWT done properly is not dangerous. ES256, explicit algorithm enforcement, 15 minute expiry, no sensitive payload data, a jti, and a JWKS endpoint \u2014 that is a solid foundation and it is what most well-run teams have. The algorithm confusion vulnerabilities are mostly a historical story at this point if you are on a maintained library."
      },
      {
        type: "paragraph",
        text: "I use PASETO because I prefer the algorithm safety to be structural rather than something I have to enforce through code review. And I use PASETO v4.local for payments because payment data should be encrypted, not just signed, and the implicit assertion gives me a cryptographic binding I cannot get from JWT without reaching for JWE \u2014 which is a significantly more complex spec."
      },
      {
        type: "paragraph",
        text: "But this is my stack, my choice, and my opinion. PASETO adoption is low not because JWT is better but because switching costs are real and most teams are not in greenfield territory. If you are starting fresh and you own the whole system, I think PASETO is the cleaner choice. If you are integrating with third-party identity providers, you are using JWT and that is fine."
      },
      {
        type: "paragraph",
        text: "Either way \u2014 the format is the smaller decision. The bigger one is whether you are using a signed stateless token for a job that needs an opaque revocable one. Refresh tokens that are JWT. Password reset links that are JWT. API keys that are JWT. Get the taxonomy right first. Then worry about JWT vs PASETO."
      }
    ]
  }
];

const _name_ = defineEventHandler((event) => {
  const fileName = getRouterParam(event, "name") || "";
  const card = allCards(blogs).find((c) => c.fileName === fileName);
  if (!card) {
    throw createError({ statusCode: 404, statusMessage: "Not Found" });
  }
  ensureFonts();
  setResponseHeader(event, "content-type", "image/png");
  return renderOgPng(card);
});

const _name_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _name_
}, Symbol.toStringTag, { value: 'Module' }));

const siteUrl = "https://elrefai.me";
const sitePaths = {
  home: "/",
  projects: "/projects",
  blogs: "/blogs",
  resume: "/resume"
};

const escapeXml = (value) => value.replace(
  /[&<>"']/g,
  (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]
);
const inlineHtml = (text) => text.split("`").map((segment, index) => {
  if (index % 2 === 1) return `<code>${escapeXml(segment)}</code>`;
  return escapeXml(segment).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
    const abs = /^https?:\/\//.test(href) ? href : new URL(href, siteUrl).toString();
    return `<a href="${abs}">${label}</a>`;
  });
}).join("");
const blockToHtml = (block) => {
  var _a;
  switch (block.type) {
    case "paragraph":
      return `<p>${inlineHtml(block.text)}</p>`;
    case "heading": {
      const level = (_a = block.level) != null ? _a : 2;
      return `<h${level}>${escapeXml(block.text)}</h${level}>`;
    }
    case "list":
      return `<ul>${block.items.map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</ul>`;
    case "code":
      return `<pre><code>${escapeXml(block.code)}</code></pre>`;
  }
};
const createRssXml = () => {
  const sorted = [...blogs].sort((a, b) => b.date.localeCompare(a.date));
  const lastBuildDate = new Date(
    sorted.map((post) => {
      var _a;
      return (_a = post.updated) != null ? _a : post.date;
    }).sort().at(-1)
  ).toUTCString();
  const items = sorted.map((post) => {
    var _a;
    const url = new URL(`${sitePaths.blogs}/${post.slug}`, siteUrl).toString();
    const fullHtml = post.blocks.map(blockToHtml).join("").replaceAll("]]>", "]]&gt;");
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml((_a = post.metaDescription) != null ? _a : post.excerpt)}</description>
      <content:encoded><![CDATA[${fullHtml}]]></content:encoded>
    </item>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blogs \u2022 Mohammed Mostafa</title>
    <link>${new URL(sitePaths.blogs, siteUrl).toString()}</link>
    <atom:link href="${new URL("/rss.xml", siteUrl).toString()}" rel="self" type="application/rss+xml"/>
    <description>Backend engineering notes about Node.js, TypeScript, Express.js, APIs, queues, Redis, authentication, payment tokens, and production systems.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;
};
const rss_xml = defineEventHandler((event) => {
  setResponseHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return createRssXml();
});

const rss_xml$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: rss_xml
}, Symbol.toStringTag, { value: 'Module' }));

const staticPagesLastmod = "2026-07-01";
const sitemapEntries = [
  {
    path: sitePaths.home,
    changefreq: "weekly",
    priority: "1.0",
    lastmod: staticPagesLastmod
  },
  {
    path: sitePaths.projects,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: staticPagesLastmod
  },
  {
    path: sitePaths.blogs,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: "2026-06-27"
  },
  {
    path: sitePaths.resume,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: staticPagesLastmod
  },
  ...caseStudies.map((cs) => ({
    path: `${sitePaths.projects}/${cs.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: "2026-07-09"
  })),
  ...blogs.map((blog) => ({
    path: `${sitePaths.blogs}/${blog.slug}`,
    changefreq: "weekly",
    priority: "0.7",
    lastmod: blog.updated || blog.date
  }))
];

const globalSources = [
  "shared/utils/seo",
  "app/assets/blueprint.css",
  "app/assets/main.css",
  "app/app.vue",
  "app/components/NavBar.vue",
  "app/components/footer.vue",
  "app/components/FloorSection.vue",
  "uno.config.ts",
  "nuxt.config.ts"
];
const routeSources = {
  [sitePaths.home]: ["app/pages/index.vue", "app/components/aboutme.vue", "app/components/SelectedProjects.vue", "app/components/timeline.vue", "shared/utils/projects.ts", ...globalSources],
  [sitePaths.projects]: ["app/pages/projects/index.vue", "shared/utils/projects.ts", "shared/utils/caseStudies.ts", ...globalSources],
  [sitePaths.blogs]: ["app/pages/blogs/index.vue", "shared/utils/blogs.ts", ...globalSources],
  [sitePaths.resume]: ["app/pages/resume.vue", ...globalSources],
  ...Object.fromEntries(
    caseStudies.map((cs) => [
      `${sitePaths.projects}/${cs.slug}`,
      ["app/pages/projects/[slug].vue", "shared/utils/caseStudies.ts", ...globalSources]
    ])
  )
};
const gitLastmod = (files) => {
  const dates = files.map((file) => {
    try {
      return execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: "utf8" }).trim();
    } catch {
      return "";
    }
  }).filter(Boolean).sort();
  return dates.at(-1);
};
const createSitemapXml = () => {
  const urls = sitemapEntries.map(({ path, changefreq, priority, lastmod }) => {
    const sources = routeSources[path];
    const resolvedLastmod = sources && gitLastmod(sources) || lastmod;
    return `  <url>
    <loc>${new URL(path, siteUrl).toString()}</loc>
    <lastmod>${resolvedLastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};
const sitemap_xml = defineEventHandler((event) => {
  setResponseHeader(event, "content-type", "application/xml; charset=utf-8");
  return createSitemapXml();
});

const sitemap_xml$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sitemap_xml
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const handler = defineRenderHandler((event) => {
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		if (typeof ssrError.data === "string") {
			try {
				ssrError.data = destr(ssrError.data);
			} catch {}
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})   }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
