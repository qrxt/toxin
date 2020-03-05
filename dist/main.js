/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ce4922dd292065a8b062";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/raw-loader/dist/cjs.js!./index.pug":
/*!**********************************************************!*\
  !*** ../node_modules/raw-loader/dist/cjs.js!./index.pug ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"export default \\\"<!DOCTYPE html>\\\\n<html lang=\\\\\\\"ru\\\\\\\">\\\\n  <head>\\\\n    <meta charset=\\\\\\\"utf-8\\\\\\\">\\\\n    <title>Toxin</title>\\\\n    <meta name=\\\\\\\"viewport\\\\\\\" content=\\\\\\\"width=device-width, initial-scale=1.0\\\\\\\">\\\\n  </head>\\\\n  <body>\\\\n    <div class=\\\\\\\"page-wrapper\\\\\\\">\\\\n      <header class=\\\\\\\"uikit-header\\\\\\\">\\\\n        <div class=\\\\\\\"uikit-header__inner\\\\\\\"><a class=\\\\\\\"logo__link className\\\\\\\">\\\\n            <svg width=\\\\\\\"45\\\\\\\" height=\\\\\\\"45\\\\\\\" aria-hidden=\\\\\\\"true\\\\\\\">\\\\n              <use xlink:href=\\\\\\\"assets/img/sprite.svg#logo-toxin\\\\\\\"></use>\\\\n            </svg></a>\\\\n        </div>\\\\n      </header>\\\\n      <section class=\\\\\\\"waymark\\\\\\\">\\\\n        <div class=\\\\\\\"wrapper waymark__inner\\\\\\\">\\\\n          <h1>Ссылки на страницы проекта 🚩</h1>\\\\n          <div class=\\\\\\\"waymark__ui-kit\\\\\\\">\\\\n            <h2>UI-Kit</h2>\\\\n            <div class=\\\\\\\"visually-hidden\\\\\\\">\\\\n              ✔️\\\\n              🚧\\\\n              ❌\\\\n            </div>\\\\n            <ul>\\\\n              <li><a href=\\\\\\\"uikit-colors.html\\\\\\\">\\\\n                  Colors &amp; Type\\\\n                  ✔️</a></li>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Form Elements\\\\n                  🚧</a></li>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Cards\\\\n                  ❌</a></li>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Headers &amp; Footers\\\\n                  ❌</a></li>\\\\n            </ul>\\\\n          </div>\\\\n          <div class=\\\\\\\"waymark__pages\\\\\\\">\\\\n            <h2>Основные страницы</h2>\\\\n            <ul>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Landing Page\\\\n                  ❌</a></li>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Search Room\\\\n                  ❌</a></li>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Room Details\\\\n                  ❌</a></li>\\\\n              <li><a href=\\\\\\\"#\\\\\\\">\\\\n                  Registration &amp; Sign in\\\\n                  ❌</a></li>\\\\n            </ul>\\\\n          </div>\\\\n        </div>\\\\n      </section>\\\\n    </div>\\\\n  </body>\\\\n</html>\\\";\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5wdWc/N2QyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFlLGlvQ0FBa2tDLHVUQUF1VCwyakJBQTJqQix3SkFBd0osQ0FBQyIsImZpbGUiOiIuLi9ub2RlX21vZHVsZXMvcmF3LWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LnB1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiZXhwb3J0IGRlZmF1bHQgXFxcIjwhRE9DVFlQRSBodG1sPlxcXFxuPGh0bWwgbGFuZz1cXFxcXFxcInJ1XFxcXFxcXCI+XFxcXG4gIDxoZWFkPlxcXFxuICAgIDxtZXRhIGNoYXJzZXQ9XFxcXFxcXCJ1dGYtOFxcXFxcXFwiPlxcXFxuICAgIDx0aXRsZT5Ub3hpbjwvdGl0bGU+XFxcXG4gICAgPG1ldGEgbmFtZT1cXFxcXFxcInZpZXdwb3J0XFxcXFxcXCIgY29udGVudD1cXFxcXFxcIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcXFxcXFxcIj5cXFxcbiAgPC9oZWFkPlxcXFxuICA8Ym9keT5cXFxcbiAgICA8ZGl2IGNsYXNzPVxcXFxcXFwicGFnZS13cmFwcGVyXFxcXFxcXCI+XFxcXG4gICAgICA8aGVhZGVyIGNsYXNzPVxcXFxcXFwidWlraXQtaGVhZGVyXFxcXFxcXCI+XFxcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ1aWtpdC1oZWFkZXJfX2lubmVyXFxcXFxcXCI+PGEgY2xhc3M9XFxcXFxcXCJsb2dvX19saW5rIGNsYXNzTmFtZVxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cXFxcXFxcIjQ1XFxcXFxcXCIgaGVpZ2h0PVxcXFxcXFwiNDVcXFxcXFxcIiBhcmlhLWhpZGRlbj1cXFxcXFxcInRydWVcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVxcXFxcXFwiYXNzZXRzL2ltZy9zcHJpdGUuc3ZnI2xvZ28tdG94aW5cXFxcXFxcIj48L3VzZT5cXFxcbiAgICAgICAgICAgIDwvc3ZnPjwvYT5cXFxcbiAgICAgICAgPC9kaXY+XFxcXG4gICAgICA8L2hlYWRlcj5cXFxcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXFxcXFwid2F5bWFya1xcXFxcXFwiPlxcXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwid3JhcHBlciB3YXltYXJrX19pbm5lclxcXFxcXFwiPlxcXFxuICAgICAgICAgIDxoMT7QodGB0YvQu9C60Lgg0L3QsCDRgdGC0YDQsNC90LjRhtGLINC/0YDQvtC10LrRgtCwIPCfmqk8L2gxPlxcXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ3YXltYXJrX191aS1raXRcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgIDxoMj5VSS1LaXQ8L2gyPlxcXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFxcXFxcInZpc3VhbGx5LWhpZGRlblxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICDinJTvuI9cXFxcbiAgICAgICAgICAgICAg8J+ap1xcXFxuICAgICAgICAgICAgICDinYxcXFxcbiAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgPHVsPlxcXFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cXFxcXFxcInVpa2l0LWNvbG9ycy5odG1sXFxcXFxcXCI+XFxcXG4gICAgICAgICAgICAgICAgICBDb2xvcnMgJmFtcDsgVHlwZVxcXFxuICAgICAgICAgICAgICAgICAg4pyU77iPPC9hPjwvbGk+XFxcXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVxcXFxcXFwiI1xcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgRm9ybSBFbGVtZW50c1xcXFxuICAgICAgICAgICAgICAgICAg8J+apzwvYT48L2xpPlxcXFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cXFxcXFxcIiNcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIENhcmRzXFxcXG4gICAgICAgICAgICAgICAgICDinYw8L2E+PC9saT5cXFxcbiAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XFxcXFxcXCIjXFxcXFxcXCI+XFxcXG4gICAgICAgICAgICAgICAgICBIZWFkZXJzICZhbXA7IEZvb3RlcnNcXFxcbiAgICAgICAgICAgICAgICAgIOKdjDwvYT48L2xpPlxcXFxuICAgICAgICAgICAgPC91bD5cXFxcbiAgICAgICAgICA8L2Rpdj5cXFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwid2F5bWFya19fcGFnZXNcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgIDxoMj7QntGB0L3QvtCy0L3Ri9C1INGB0YLRgNCw0L3QuNGG0Ys8L2gyPlxcXFxuICAgICAgICAgICAgPHVsPlxcXFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cXFxcXFxcIiNcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIExhbmRpbmcgUGFnZVxcXFxuICAgICAgICAgICAgICAgICAg4p2MPC9hPjwvbGk+XFxcXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVxcXFxcXFwiI1xcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgU2VhcmNoIFJvb21cXFxcbiAgICAgICAgICAgICAgICAgIOKdjDwvYT48L2xpPlxcXFxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cXFxcXFxcIiNcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIFJvb20gRGV0YWlsc1xcXFxuICAgICAgICAgICAgICAgICAg4p2MPC9hPjwvbGk+XFxcXG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVxcXFxcXFwiI1xcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgUmVnaXN0cmF0aW9uICZhbXA7IFNpZ24gaW5cXFxcbiAgICAgICAgICAgICAgICAgIOKdjDwvYT48L2xpPlxcXFxuICAgICAgICAgICAgPC91bD5cXFxcbiAgICAgICAgICA8L2Rpdj5cXFxcbiAgICAgICAgPC9kaXY+XFxcXG4gICAgICA8L3NlY3Rpb24+XFxcXG4gICAgPC9kaXY+XFxcXG4gIDwvYm9keT5cXFxcbjwvaHRtbD5cXFwiO1wiOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/raw-loader/dist/cjs.js!./index.pug\n");

/***/ }),

/***/ "../node_modules/raw-loader/dist/cjs.js!./page-uikit-colors.pug":
/*!**********************************************************************!*\
  !*** ../node_modules/raw-loader/dist/cjs.js!./page-uikit-colors.pug ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"export default \\\"<!DOCTYPE html>\\\\n<html lang=\\\\\\\"ru\\\\\\\">\\\\n  <head>\\\\n    <meta charset=\\\\\\\"utf-8\\\\\\\">\\\\n    <title>Toxin</title>\\\\n    <meta name=\\\\\\\"viewport\\\\\\\" content=\\\\\\\"width=device-width, initial-scale=1.0\\\\\\\">\\\\n  </head>\\\\n  <body>\\\\n    <div class=\\\\\\\"page-wrapper\\\\\\\">\\\\n      <header class=\\\\\\\"uikit-header\\\\\\\">\\\\n        <div class=\\\\\\\"uikit-header__inner\\\\\\\"><a class=\\\\\\\"logo__link className\\\\\\\">\\\\n            <svg width=\\\\\\\"45\\\\\\\" height=\\\\\\\"45\\\\\\\" aria-hidden=\\\\\\\"true\\\\\\\">\\\\n              <use xlink:href=\\\\\\\"assets/img/sprite.svg#logo-toxin\\\\\\\"></use>\\\\n            </svg></a>\\\\n        </div>\\\\n      </header>\\\\n      <section class=\\\\\\\"uikit-colors\\\\\\\">\\\\n        <div class=\\\\\\\"wrapper uikit-colors__inner\\\\\\\">\\\\n          <h1 class=\\\\\\\"visually-hidden\\\\\\\">UI-Kit Colors & Type</h1>\\\\n          <div class=\\\\\\\"uikit-colors__content\\\\\\\">\\\\n            <ul class=\\\\\\\"colors-list uikit-colors__list\\\\\\\">\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-darkshade100\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Dark Shade\\\\n100%\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#1F2041</p>\\\\n                </div>\\\\n              </li>\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-darkshade75\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Dark Shade\\\\n75%\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#1F2041</p>\\\\n                </div>\\\\n              </li>\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-darkshade50\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Dark Shade\\\\n50%\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#1F2041</p>\\\\n                </div>\\\\n              </li>\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-darkshade25\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Dark Shade\\\\n25%\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#1F2041</p>\\\\n                </div>\\\\n              </li>\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-darkshade5\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Dark Shade\\\\n5%\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#1F2041</p>\\\\n                </div>\\\\n              </li>\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-purple\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Purple\\\\n\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#BC9CFF</p>\\\\n                </div>\\\\n              </li>\\\\n              <li class=\\\\\\\"color colors-list__item\\\\\\\">\\\\n                <div class=\\\\\\\"color__sample color__sample--color-green\\\\\\\"></div>\\\\n                <div class=\\\\\\\"color__text-wrapper\\\\\\\">\\\\n                  <h2 class=\\\\\\\"h2 color__title\\\\\\\">Green\\\\n\\\\n                  </h2>\\\\n                  <p class=\\\\\\\"color__hex\\\\\\\">#6FCF97</p>\\\\n                </div>\\\\n              </li>\\\\n            </ul>\\\\n            <div class=\\\\\\\"uikit-colors__type\\\\\\\">\\\\n              <dl class=\\\\\\\"uikit-colors__types\\\\\\\">\\\\n                <div class=\\\\\\\"uikit-colors__type-wrapper\\\\\\\">\\\\n                  <dt class=\\\\\\\"uikit-colors__type-name uikit-colors__type-name--h1\\\\\\\">h1</dt>\\\\n                  <dd class=\\\\\\\"h1 uikit-colors__type-sample\\\\\\\">This one is the sub-section or widget title</dd>\\\\n                </div>\\\\n                <div class=\\\\\\\"uikit-colors__type-wrapper\\\\\\\">\\\\n                  <dt class=\\\\\\\"uikit-colors__type-name uikit-colors__type-name--h2\\\\\\\">h2</dt>\\\\n                  <dd class=\\\\\\\"h2 uikit-colors__type-sample uikit-colors__type-sample--h2\\\\\\\">Next one is the item title inside widgets</dd>\\\\n                </div>\\\\n                <div class=\\\\\\\"uikit-colors__type-wrapper\\\\\\\">\\\\n                  <dt class=\\\\\\\"uikit-colors__type-name uikit-colors__type-name--h3\\\\\\\">h3</dt>\\\\n                  <dd class=\\\\\\\"h3 uikit-colors__type-sample uikit-colors__type-sample--h3\\\\\\\">This is a label or CTA text</dd>\\\\n                </div>\\\\n                <div class=\\\\\\\"uikit-colors__type-wrapper\\\\\\\">\\\\n                  <dt class=\\\\\\\"uikit-colors__type-name uikit-colors__type-name--body\\\\\\\">body</dt>\\\\n                  <dd class=\\\\\\\"uikit-colors__type-sample uikit-colors__type-sample--body\\\\\\\">\\\\n                    This is the body text which is used for most\\\\n                    of the design, like paragraphs, lists, etc.\\\\n                  </dd>\\\\n                </div>\\\\n              </dl>\\\\n            </div>\\\\n          </div>\\\\n        </div>\\\\n      </section>\\\\n    </div>\\\\n  </body>\\\\n</html>\\\";\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlLXVpa2l0LWNvbG9ycy5wdWc/NTUxNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFlLDA0S0FBMjBLLENBQUMiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3Jhdy1sb2FkZXIvZGlzdC9janMuanMhLi9wYWdlLXVpa2l0LWNvbG9ycy5wdWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImV4cG9ydCBkZWZhdWx0IFxcXCI8IURPQ1RZUEUgaHRtbD5cXFxcbjxodG1sIGxhbmc9XFxcXFxcXCJydVxcXFxcXFwiPlxcXFxuICA8aGVhZD5cXFxcbiAgICA8bWV0YSBjaGFyc2V0PVxcXFxcXFwidXRmLThcXFxcXFxcIj5cXFxcbiAgICA8dGl0bGU+VG94aW48L3RpdGxlPlxcXFxuICAgIDxtZXRhIG5hbWU9XFxcXFxcXCJ2aWV3cG9ydFxcXFxcXFwiIGNvbnRlbnQ9XFxcXFxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXFxcXFxcXCI+XFxcXG4gIDwvaGVhZD5cXFxcbiAgPGJvZHk+XFxcXG4gICAgPGRpdiBjbGFzcz1cXFxcXFxcInBhZ2Utd3JhcHBlclxcXFxcXFwiPlxcXFxuICAgICAgPGhlYWRlciBjbGFzcz1cXFxcXFxcInVpa2l0LWhlYWRlclxcXFxcXFwiPlxcXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwidWlraXQtaGVhZGVyX19pbm5lclxcXFxcXFwiPjxhIGNsYXNzPVxcXFxcXFwibG9nb19fbGluayBjbGFzc05hbWVcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgIDxzdmcgd2lkdGg9XFxcXFxcXCI0NVxcXFxcXFwiIGhlaWdodD1cXFxcXFxcIjQ1XFxcXFxcXCIgYXJpYS1oaWRkZW49XFxcXFxcXCJ0cnVlXFxcXFxcXCI+XFxcXG4gICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj1cXFxcXFxcImFzc2V0cy9pbWcvc3ByaXRlLnN2ZyNsb2dvLXRveGluXFxcXFxcXCI+PC91c2U+XFxcXG4gICAgICAgICAgICA8L3N2Zz48L2E+XFxcXG4gICAgICAgIDwvZGl2PlxcXFxuICAgICAgPC9oZWFkZXI+XFxcXG4gICAgICA8c2VjdGlvbiBjbGFzcz1cXFxcXFxcInVpa2l0LWNvbG9yc1xcXFxcXFwiPlxcXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwid3JhcHBlciB1aWtpdC1jb2xvcnNfX2lubmVyXFxcXFxcXCI+XFxcXG4gICAgICAgICAgPGgxIGNsYXNzPVxcXFxcXFwidmlzdWFsbHktaGlkZGVuXFxcXFxcXCI+VUktS2l0IENvbG9ycyAmIFR5cGU8L2gxPlxcXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ1aWtpdC1jb2xvcnNfX2NvbnRlbnRcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cXFxcXFxcImNvbG9ycy1saXN0IHVpa2l0LWNvbG9yc19fbGlzdFxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICA8bGkgY2xhc3M9XFxcXFxcXCJjb2xvciBjb2xvcnMtbGlzdF9faXRlbVxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJjb2xvcl9fc2FtcGxlIGNvbG9yX19zYW1wbGUtLWNvbG9yLWRhcmtzaGFkZTEwMFxcXFxcXFwiPjwvZGl2PlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJjb2xvcl9fdGV4dC13cmFwcGVyXFxcXFxcXCI+XFxcXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcXFxcXCJoMiBjb2xvcl9fdGl0bGVcXFxcXFxcIj5EYXJrIFNoYWRlXFxcXG4xMDAlXFxcXG4gICAgICAgICAgICAgICAgICA8L2gyPlxcXFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcXFxcXCJjb2xvcl9faGV4XFxcXFxcXCI+IzFGMjA0MTwvcD5cXFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxcbiAgICAgICAgICAgICAgPC9saT5cXFxcbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVxcXFxcXFwiY29sb3IgY29sb3JzLWxpc3RfX2l0ZW1cXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwiY29sb3JfX3NhbXBsZSBjb2xvcl9fc2FtcGxlLS1jb2xvci1kYXJrc2hhZGU3NVxcXFxcXFwiPjwvZGl2PlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJjb2xvcl9fdGV4dC13cmFwcGVyXFxcXFxcXCI+XFxcXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcXFxcXCJoMiBjb2xvcl9fdGl0bGVcXFxcXFxcIj5EYXJrIFNoYWRlXFxcXG43NSVcXFxcbiAgICAgICAgICAgICAgICAgIDwvaDI+XFxcXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFxcXFxcImNvbG9yX19oZXhcXFxcXFxcIj4jMUYyMDQxPC9wPlxcXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgICA8L2xpPlxcXFxuICAgICAgICAgICAgICA8bGkgY2xhc3M9XFxcXFxcXCJjb2xvciBjb2xvcnMtbGlzdF9faXRlbVxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJjb2xvcl9fc2FtcGxlIGNvbG9yX19zYW1wbGUtLWNvbG9yLWRhcmtzaGFkZTUwXFxcXFxcXCI+PC9kaXY+XFxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFxcXFxcImNvbG9yX190ZXh0LXdyYXBwZXJcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFxcXFxcImgyIGNvbG9yX190aXRsZVxcXFxcXFwiPkRhcmsgU2hhZGVcXFxcbjUwJVxcXFxuICAgICAgICAgICAgICAgICAgPC9oMj5cXFxcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXFxcXFwiY29sb3JfX2hleFxcXFxcXFwiPiMxRjIwNDE8L3A+XFxcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxcXG4gICAgICAgICAgICAgIDwvbGk+XFxcXG4gICAgICAgICAgICAgIDxsaSBjbGFzcz1cXFxcXFxcImNvbG9yIGNvbG9ycy1saXN0X19pdGVtXFxcXFxcXCI+XFxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFxcXFxcImNvbG9yX19zYW1wbGUgY29sb3JfX3NhbXBsZS0tY29sb3ItZGFya3NoYWRlMjVcXFxcXFxcIj48L2Rpdj5cXFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwiY29sb3JfX3RleHQtd3JhcHBlclxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXFxcXFwiaDIgY29sb3JfX3RpdGxlXFxcXFxcXCI+RGFyayBTaGFkZVxcXFxuMjUlXFxcXG4gICAgICAgICAgICAgICAgICA8L2gyPlxcXFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcXFxcXCJjb2xvcl9faGV4XFxcXFxcXCI+IzFGMjA0MTwvcD5cXFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxcbiAgICAgICAgICAgICAgPC9saT5cXFxcbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVxcXFxcXFwiY29sb3IgY29sb3JzLWxpc3RfX2l0ZW1cXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwiY29sb3JfX3NhbXBsZSBjb2xvcl9fc2FtcGxlLS1jb2xvci1kYXJrc2hhZGU1XFxcXFxcXCI+PC9kaXY+XFxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFxcXFxcImNvbG9yX190ZXh0LXdyYXBwZXJcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFxcXFxcImgyIGNvbG9yX190aXRsZVxcXFxcXFwiPkRhcmsgU2hhZGVcXFxcbjUlXFxcXG4gICAgICAgICAgICAgICAgICA8L2gyPlxcXFxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcXFxcXCJjb2xvcl9faGV4XFxcXFxcXCI+IzFGMjA0MTwvcD5cXFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxcbiAgICAgICAgICAgICAgPC9saT5cXFxcbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVxcXFxcXFwiY29sb3IgY29sb3JzLWxpc3RfX2l0ZW1cXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwiY29sb3JfX3NhbXBsZSBjb2xvcl9fc2FtcGxlLS1jb2xvci1wdXJwbGVcXFxcXFxcIj48L2Rpdj5cXFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwiY29sb3JfX3RleHQtd3JhcHBlclxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXFxcXFwiaDIgY29sb3JfX3RpdGxlXFxcXFxcXCI+UHVycGxlXFxcXG5cXFxcbiAgICAgICAgICAgICAgICAgIDwvaDI+XFxcXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFxcXFxcImNvbG9yX19oZXhcXFxcXFxcIj4jQkM5Q0ZGPC9wPlxcXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgICA8L2xpPlxcXFxuICAgICAgICAgICAgICA8bGkgY2xhc3M9XFxcXFxcXCJjb2xvciBjb2xvcnMtbGlzdF9faXRlbVxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJjb2xvcl9fc2FtcGxlIGNvbG9yX19zYW1wbGUtLWNvbG9yLWdyZWVuXFxcXFxcXCI+PC9kaXY+XFxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFxcXFxcImNvbG9yX190ZXh0LXdyYXBwZXJcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cXFxcXFxcImgyIGNvbG9yX190aXRsZVxcXFxcXFwiPkdyZWVuXFxcXG5cXFxcbiAgICAgICAgICAgICAgICAgIDwvaDI+XFxcXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFxcXFxcImNvbG9yX19oZXhcXFxcXFxcIj4jNkZDRjk3PC9wPlxcXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgICA8L2xpPlxcXFxuICAgICAgICAgICAgPC91bD5cXFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ1aWtpdC1jb2xvcnNfX3R5cGVcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgPGRsIGNsYXNzPVxcXFxcXFwidWlraXQtY29sb3JzX190eXBlc1xcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ1aWtpdC1jb2xvcnNfX3R5cGUtd3JhcHBlclxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgPGR0IGNsYXNzPVxcXFxcXFwidWlraXQtY29sb3JzX190eXBlLW5hbWUgdWlraXQtY29sb3JzX190eXBlLW5hbWUtLWgxXFxcXFxcXCI+aDE8L2R0PlxcXFxuICAgICAgICAgICAgICAgICAgPGRkIGNsYXNzPVxcXFxcXFwiaDEgdWlraXQtY29sb3JzX190eXBlLXNhbXBsZVxcXFxcXFwiPlRoaXMgb25lIGlzIHRoZSBzdWItc2VjdGlvbiBvciB3aWRnZXQgdGl0bGU8L2RkPlxcXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ1aWtpdC1jb2xvcnNfX3R5cGUtd3JhcHBlclxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgPGR0IGNsYXNzPVxcXFxcXFwidWlraXQtY29sb3JzX190eXBlLW5hbWUgdWlraXQtY29sb3JzX190eXBlLW5hbWUtLWgyXFxcXFxcXCI+aDI8L2R0PlxcXFxuICAgICAgICAgICAgICAgICAgPGRkIGNsYXNzPVxcXFxcXFwiaDIgdWlraXQtY29sb3JzX190eXBlLXNhbXBsZSB1aWtpdC1jb2xvcnNfX3R5cGUtc2FtcGxlLS1oMlxcXFxcXFwiPk5leHQgb25lIGlzIHRoZSBpdGVtIHRpdGxlIGluc2lkZSB3aWRnZXRzPC9kZD5cXFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXFxcXFwidWlraXQtY29sb3JzX190eXBlLXdyYXBwZXJcXFxcXFxcIj5cXFxcbiAgICAgICAgICAgICAgICAgIDxkdCBjbGFzcz1cXFxcXFxcInVpa2l0LWNvbG9yc19fdHlwZS1uYW1lIHVpa2l0LWNvbG9yc19fdHlwZS1uYW1lLS1oM1xcXFxcXFwiPmgzPC9kdD5cXFxcbiAgICAgICAgICAgICAgICAgIDxkZCBjbGFzcz1cXFxcXFxcImgzIHVpa2l0LWNvbG9yc19fdHlwZS1zYW1wbGUgdWlraXQtY29sb3JzX190eXBlLXNhbXBsZS0taDNcXFxcXFxcIj5UaGlzIGlzIGEgbGFiZWwgb3IgQ1RBIHRleHQ8L2RkPlxcXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcXFxcXCJ1aWtpdC1jb2xvcnNfX3R5cGUtd3JhcHBlclxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgPGR0IGNsYXNzPVxcXFxcXFwidWlraXQtY29sb3JzX190eXBlLW5hbWUgdWlraXQtY29sb3JzX190eXBlLW5hbWUtLWJvZHlcXFxcXFxcIj5ib2R5PC9kdD5cXFxcbiAgICAgICAgICAgICAgICAgIDxkZCBjbGFzcz1cXFxcXFxcInVpa2l0LWNvbG9yc19fdHlwZS1zYW1wbGUgdWlraXQtY29sb3JzX190eXBlLXNhbXBsZS0tYm9keVxcXFxcXFwiPlxcXFxuICAgICAgICAgICAgICAgICAgICBUaGlzIGlzIHRoZSBib2R5IHRleHQgd2hpY2ggaXMgdXNlZCBmb3IgbW9zdFxcXFxuICAgICAgICAgICAgICAgICAgICBvZiB0aGUgZGVzaWduLCBsaWtlIHBhcmFncmFwaHMsIGxpc3RzLCBldGMuXFxcXG4gICAgICAgICAgICAgICAgICA8L2RkPlxcXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXFxuICAgICAgICAgICAgICA8L2RsPlxcXFxuICAgICAgICAgICAgPC9kaXY+XFxcXG4gICAgICAgICAgPC9kaXY+XFxcXG4gICAgICAgIDwvZGl2PlxcXFxuICAgICAgPC9zZWN0aW9uPlxcXFxuICAgIDwvZGl2PlxcXFxuICA8L2JvZHk+XFxcXG48L2h0bWw+XFxcIjtcIjsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../node_modules/raw-loader/dist/cjs.js!./page-uikit-colors.pug\n");

/***/ }),

/***/ "./ sync ../node_modules/raw-loader/dist/cjs.js!./ \\.pug$":
/*!*************************************************************************!*\
  !*** . sync nonrecursive ../node_modules/raw-loader/dist/cjs.js \.pug$ ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./index.pug\": \"../node_modules/raw-loader/dist/cjs.js!./index.pug\",\n\t\"./page-uikit-colors.pug\": \"../node_modules/raw-loader/dist/cjs.js!./page-uikit-colors.pug\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./ sync ../node_modules/raw-loader/dist/cjs.js!./ \\\\.pug$\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLiBzeW5jIG5vbnJlY3Vyc2l2ZSAuLi9ub2RlX21vZHVsZXMvcmF3LWxvYWRlci9kaXN0L2Nqcy5qcyBcXC5wdWckP2Q5MjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuLyBzeW5jIC4uL25vZGVfbW9kdWxlcy9yYXctbG9hZGVyL2Rpc3QvY2pzLmpzIS4vIFxcLnB1ZyQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbWFwID0ge1xuXHRcIi4vaW5kZXgucHVnXCI6IFwiLi4vbm9kZV9tb2R1bGVzL3Jhdy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5wdWdcIixcblx0XCIuL3BhZ2UtdWlraXQtY29sb3JzLnB1Z1wiOiBcIi4uL25vZGVfbW9kdWxlcy9yYXctbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcGFnZS11aWtpdC1jb2xvcnMucHVnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgLi4vbm9kZV9tb2R1bGVzL3Jhdy1sb2FkZXIvZGlzdC9janMuanMhLi8gXFxcXC5wdWckXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./ sync ../node_modules/raw-loader/dist/cjs.js!./ \\.pug$\n");

/***/ }),

/***/ "./assets/img sync \\.(png|jpe?g|svg)$":
/*!*********************************************************!*\
  !*** ./assets/img sync nonrecursive \.(png|jpe?g|svg)$ ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./logo-text.png\": \"./assets/img/logo-text.png\",\n\t\"./logo-toxin.svg\": \"./assets/img/logo-toxin.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./assets/img sync \\\\.(png|jpe?g|svg)$\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvaW1nIHN5bmMgbm9ucmVjdXJzaXZlIFxcLihwbmd8anBlP2MyYzkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL2Fzc2V0cy9pbWcgc3luYyBcXC4ocG5nfGpwZT9nfHN2ZykkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2xvZ28tdGV4dC5wbmdcIjogXCIuL2Fzc2V0cy9pbWcvbG9nby10ZXh0LnBuZ1wiLFxuXHRcIi4vbG9nby10b3hpbi5zdmdcIjogXCIuL2Fzc2V0cy9pbWcvbG9nby10b3hpbi5zdmdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9hc3NldHMvaW1nIHN5bmMgXFxcXC4ocG5nfGpwZT9nfHN2ZykkXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./assets/img sync \\.(png|jpe?g|svg)$\n");

/***/ }),

/***/ "./assets/img sync \\.svg$":
/*!*********************************************!*\
  !*** ./assets/img sync nonrecursive \.svg$ ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./logo-toxin.svg\": \"./assets/img/logo-toxin.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./assets/img sync \\\\.svg$\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvaW1nIHN5bmMgbm9ucmVjdXJzaXZlIFxcLnN2ZyQ/OGFmMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL2Fzc2V0cy9pbWcgc3luYyBcXC5zdmckLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2xvZ28tdG94aW4uc3ZnXCI6IFwiLi9hc3NldHMvaW1nL2xvZ28tdG94aW4uc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vYXNzZXRzL2ltZyBzeW5jIFxcXFwuc3ZnJFwiOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/img sync \\.svg$\n");

/***/ }),

/***/ "./assets/img/logo-text.png":
/*!**********************************!*\
  !*** ./assets/img/logo-text.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"assets/img/logo-text.png\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvaW1nL2xvZ28tdGV4dC5wbmc/M2JhZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFlLG9GQUF1Qiw2QkFBNkIiLCJmaWxlIjoiLi9hc3NldHMvaW1nL2xvZ28tdGV4dC5wbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYXNzZXRzL2ltZy9sb2dvLXRleHQucG5nXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./assets/img/logo-text.png\n");

/***/ }),

/***/ "./assets/img/logo-toxin.svg":
/*!***********************************!*\
  !*** ./assets/img/logo-toxin.svg ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n      id: \"logo-toxin-usage\",\n      viewBox: \"0 0 48 48\",\n      url: \"/assets/img/\" + \"sprite.svg#logo-toxin\",\n      toString: function () {\n        return this.url;\n      }\n    });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvaW1nL2xvZ28tdG94aW4uc3ZnP2IzNmEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEsiLCJmaWxlIjoiLi9hc3NldHMvaW1nL2xvZ28tdG94aW4uc3ZnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAgICAgaWQ6IFwibG9nby10b3hpbi11c2FnZVwiLFxuICAgICAgdmlld0JveDogXCIwIDAgNDggNDhcIixcbiAgICAgIHVybDogXCIvYXNzZXRzL2ltZy9cIiArIFwic3ByaXRlLnN2ZyNsb2dvLXRveGluXCIsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cmw7XG4gICAgICB9XG4gICAgfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/img/logo-toxin.svg\n");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ \"./style.scss\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style__WEBPACK_IMPORTED_MODULE_0__);\nconst importAll = r => r.keys().map(r);\n\n // pug pages\n\nconst pugs = importAll(__webpack_require__(\"./ sync ../node_modules/raw-loader/dist/cjs.js!./ \\\\.pug$\")); // svg assets\n\nconst svgs = importAll(__webpack_require__(\"./assets/img sync \\\\.svg$\")); // images\n\nconst images = importAll(__webpack_require__(\"./assets/img sync \\\\.(png|jpe?g|svg)$\"));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcz80MWY1Il0sIm5hbWVzIjpbImltcG9ydEFsbCIsInIiLCJrZXlzIiwibWFwIiwicHVncyIsInJlcXVpcmUiLCJzdmdzIiwiaW1hZ2VzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFNQSxTQUFTLEdBQUdDLENBQUMsSUFDakJBLENBQUMsQ0FBQ0MsSUFBRixHQUFTQyxHQUFULENBQWFGLENBQWIsQ0FERjs7Q0FLQTs7QUFDQSxNQUFNRyxJQUFJLEdBQUdKLFNBQVMsQ0FDcEJLLGdGQURvQixDQUF0QixDLENBSUE7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHTixTQUFTLENBQ3BCSyxnREFEb0IsQ0FBdEIsQyxDQUlBOztBQUNBLE1BQU1FLE1BQU0sR0FBR1AsU0FBUyxDQUN0QkssNERBRHNCLENBQXhCIiwiZmlsZSI6Ii4vaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbXBvcnRBbGwgPSByID0+XG4gIHIua2V5cygpLm1hcChyKTtcblxuaW1wb3J0IFwiLi9zdHlsZVwiO1xuXG4vLyBwdWcgcGFnZXNcbmNvbnN0IHB1Z3MgPSBpbXBvcnRBbGwoXG4gIHJlcXVpcmUuY29udGV4dCgncmF3LWxvYWRlciEuLycsIGZhbHNlLCAvXFwucHVnJC8pXG4pO1xuXG4vLyBzdmcgYXNzZXRzXG5jb25zdCBzdmdzID0gaW1wb3J0QWxsKFxuICByZXF1aXJlLmNvbnRleHQoJy4vYXNzZXRzL2ltZy8nLCBmYWxzZSwgL1xcLnN2ZyQvKVxuKTtcblxuLy8gaW1hZ2VzXG5jb25zdCBpbWFnZXMgPSBpbXBvcnRBbGwoXG4gIHJlcXVpcmUuY29udGV4dCgnLi9hc3NldHMvaW1nLycsIGZhbHNlLCAvXFwuKHBuZ3xqcGU/Z3xzdmcpJC8pXG4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./index.js\n");

/***/ }),

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(true) {\n      // 1583438425529\n      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.i, {\"hmr\":true,\"reloadAll\":true,\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZS5zY3NzPzY4ZjAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywwSkFBb0csRUFBRSxRQUFTLEdBQUcsMkNBQTJDO0FBQzNMO0FBQ0E7QUFDQSIsImZpbGUiOiIuL3N0eWxlLnNjc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTgzNDM4NDI1NTI5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIkM6L1VzZXJzL3FyeHQzL0Rlc2t0b3AvdG94aW4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiaG1yXCI6dHJ1ZSxcInJlbG9hZEFsbFwiOnRydWUsXCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./style.scss\n");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi @babel/polyfill ./index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"../node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ })

/******/ });