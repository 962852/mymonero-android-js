// Copyright (c) 2014-2019, MyMonero.com
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
//
"use strict"
//
const RootView_Base = require('./RootView_Base.web')
const RootFooterView = require('./RootFooterView.web')
//
class RootView extends RootView_Base
{
	constructor(options, context)
	{
		super(options, context)
	}
	setup_tabBarAndContentView()
	{
		super.setup_tabBarAndContentView() // must call first
		//
		const self = this
		const layer = self.tabBarViewAndContentView.layer
		layer.style.height = `calc(100% - ${self.context.rootViewFooterHeight}px)`
		//
		const footerView = new RootFooterView({}, self.context)
		self.footerView = footerView
		self.addSubview(footerView)
	}
	setup_passwordEntryViewController()
	{// overridden and not calling on super
		const self = this
		const passwordController = self.context.passwordController
		const PasswordEntryViewController = require('../../Passwords/Controllers/PasswordEntryViewController.web')
		const passwordEntryViewController = new PasswordEntryViewController(self.tabBarViewAndContentView, passwordController)
		self.passwordEntryViewController = passwordEntryViewController
		{
			passwordEntryViewController.on(
				passwordEntryViewController.EventName_willDismissView(),
				function()
				{
					self.tabBarViewAndContentView.SetTabBarItemButtonsInteractivityNeedsUpdateFromProviders()
				}
			)
			passwordEntryViewController.on(
				passwordEntryViewController.EventName_willPresentInView(),
				function()
				{
					self.tabBarViewAndContentView.DisableTabBarItemButtons()
				}
			)
		}
	}
}
module.exports = RootView
