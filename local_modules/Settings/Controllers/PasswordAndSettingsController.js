// Copyright (c) 2014-2017, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

"use strict"
//
const document_cryptor = require('../../symmetric_cryptor/document_cryptor')
const CryptSchemeFieldValueTypes = document_cryptor.CryptSchemeFieldValueTypes
const documentCryptScheme =
{
	serverURL: { type: CryptSchemeFieldValueTypes.String },
	appTimeoutAfterS: { type: CryptSchemeFieldValueTypes.String },
	notifyMeWhen: { type: CryptSchemeFieldValueTypes.JSON },
	syncWithServer: { type: CryptSchemeFieldValueTypes.JSON }
}
//
const PasswordController = require('../../Passwords/Controllers/PasswordController')
class PasswordAndSettingsController extends PasswordController
{
	constructor(options, context)
	{
		super(options, context)
	}
	//
	//
	// Runtime - Accessors
	//
	EventName_settingsChanged_serverURL()
	{
		return "EventName_settingsChanged_serverURL"
	}
	EventName_settingsChanged_appTimeoutAfterS()
	{
		return "EventName_settingsChanged_appTimeoutAfterS"
	}
	EventName_settingsChanged_notifyMeWhen()
	{
		return "EventName_settingsChanged_notifyMeWhen"
	}
	EventName_settingsChanged_syncWithServer()
	{
		return "EventName_settingsChanged_syncWithServer"
	}
	//
	//
	// Runtime - Imperatives
	//
	Set_settings_valuesByKey(
		valuesByKey,
		fn // (err?) -> Void
	)
	{
		const self = this
		const valueKeys = Object.keys(valuesByKey)
		var didUpdate_serverURL = false
		var didUpdate_appTimeoutAfterS = false
		var didUpdate_notifyMeWhen = false
		var didUpdate_syncWithServer = false
		for (let valueKey of valueKeys) {
			const value = valuesByKey[valueKey]
			{ // validate / mark as updated for yield later
				if (valueKey === "serverURL") {
					didUpdate_serverURL = true
				} else if (valueKey === "appTimeoutAfterS") {
					didUpdate_appTimeoutAfterS = true
				} else if (valueKey === "notifyMeWhen") {
					didUpdate_notifyMeWhen = true
				} else if (valueKey === "syncWithServer") {
					didUpdate_syncWithServer = true
				}
			}
			{ // set
				self[valueKey] = value
			}
		}
		self.saveToDisk(
			function(err)
			{
				if (err) {
					console.error("Failed to save new valuesByKey", err)
				} else {
					console.log("📝  Successfully saved " + self.constructor.name + " update ", JSON.stringify(valuesByKey))
					if (didUpdate_serverURL) {
						self.emit(self.EventName_settingsChanged_serverURL(), self.serverURL)
					}
					if (didUpdate_appTimeoutAfterS) {
						self.emit(self.EventName_settingsChanged_appTimeoutAfterS(), self.appTimeoutAfterS)
					}
					if (didUpdate_notifyMeWhen) {
						self.emit(self.EventName_settingsChanged_notifyMeWhen(), self.notifyMeWhen)
					}
					if (didUpdate_syncWithServer) {
						self.emit(self.EventName_settingsChanged_syncWithServer(), self.syncWithServer)
					}
				}
				fn(err)
			}
		)
	}
	//
	//
	// Overrides
	//
	_overridable_init_loadStateFromModel(
		passwordModel_doc, 
		fn // (err?) -> Void
	)
	{
		const self = this
		const encryptedDocument =
		{
			serverURL: passwordModel_doc.serverURL,
			appTimeoutAfterS: passwordModel_doc.appTimeoutAfterS,
			notifyMeWhen: passwordModel_doc.notifyMeWhen,
			syncWithServer: passwordModel_doc.syncWithServer
		}
		self.context.document_cryptor__background.New_DecryptedDocument__Async(
			encryptedDocument,
			documentCryptScheme,
			self.password,
			function(err, plaintextDocument)
			{
				if (err) {
					fn(err)
					return
				}
				self.serverURL = plaintextDocument.serverURL || ""
				self.appTimeoutAfterS = parseFloat(plaintextDocument.appTimeoutAfterS || "20") || 20.0
				self.notifyMeWhen = plaintextDocument.notifyMeWhen || {}
				self.syncWithServer = plaintextDocument.syncWithServer || {}
				// done:
				fn()
			}
		)
	}
	_overridable_finalized_persistableDocument(
		persistableDocument_in, 
		fn // (err?, finalized_persistableDocument?) -> Void
	)
	{
		const self = this
		const plaintextDocument =
		{
			serverURL: self.serverURL || "",
			appTimeoutAfterS: ("" + self.appTimeoutAfterS) || "20",
			notifyMeWhen: self.notifyMeWhen || {},
			syncWithServer: self.syncWithServer || {}
		}
		const document_cryptor__background = self.context.document_cryptor__background
		document_cryptor__background.New_EncryptedDocument__Async(
			plaintextDocument,
			documentCryptScheme,
			self.password,
			function(err, encryptedDocument)
			{
				if (err) {
					console.error("Error while encrypting user meta data :", err)
					fn(err)
					return
				}
				const finalized_persistableDocument = persistableDocument_in
				finalized_persistableDocument.serverURL = encryptedDocument.serverURL
				finalized_persistableDocument.appTimeoutAfterS = encryptedDocument.appTimeoutAfterS
				finalized_persistableDocument.notifyMeWhen = encryptedDocument.notifyMeWhen
				finalized_persistableDocument.syncWithServer = encryptedDocument.syncWithServer
				// done:
				fn(null, finalized_persistableDocument)
			}
		)
	}
}
module.exports = PasswordAndSettingsController