"use strict";(self.webpackChunklorax=self.webpackChunklorax||[]).push([[335],{1299:(Y,E,r)=>{r.d(E,{L:()=>g});var a=r(4650),f=r(6895),c=r(9299),t=r(1676);function p(h,M){if(1&h&&(a.TgZ(0,"li",11),a._uU(1),a.qZA()),2&h){const m=M.$implicit;a.xp6(1),a.Oqu(m)}}let g=(()=>{class h{constructor(){}ngOnInit(){}}return h.\u0275fac=function(m){return new(m||h)},h.\u0275cmp=a.Xpm({type:h,selectors:[["app-breadcrumb"]],inputs:{title:"title",items:"items",active_item:"active_item"},decls:14,vars:7,consts:[[1,"breadcrumb-main"],[1,"row"],[1,"col-6"],[1,"breadcrumb-title"],[1,"page-title"],[1,"breadcrumb-list"],[1,"breadcrumb-item","bcrumb-1"],[3,"routerLink"],[3,"icon"],["class","breadcrumb-item",4,"ngFor","ngForOf"],[1,"breadcrumb-item","active"],[1,"breadcrumb-item"]],template:function(m,v){1&m&&(a.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h4",4),a._uU(5),a.qZA()()(),a.TgZ(6,"div",2)(7,"ul",5)(8,"li",6)(9,"a",7),a._UZ(10,"app-feather-icons",8),a.qZA()(),a.YNc(11,p,2,1,"li",9),a.TgZ(12,"li",10),a._uU(13),a.qZA()()()()()),2&m&&(a.xp6(5),a.Oqu(v.title),a.xp6(4),a.Q6J("routerLink","/admin/dashboard/main"),a.xp6(1),a.Tol("breadcrumb-icon"),a.Q6J("icon","home"),a.xp6(1),a.Q6J("ngForOf",v.items),a.xp6(2),a.Oqu(v.active_item))},dependencies:[f.sg,c.yS,t.A]}),h})()},5626:(Y,E,r)=>{r.d(E,{K:()=>c});var a=r(5188),f=r(4650);let c=(()=>{class t{}return t.\u0275fac=function(g){return new(g||t)},t.\u0275mod=f.oAB({type:t}),t.\u0275inj=f.cJS({imports:[a.m]}),t})()},8255:(Y,E,r)=>{r.d(E,{KA:()=>q,OP:()=>x,Tx:()=>le,VK:()=>ie,p6:()=>re});var a=r(2687),f=r(1281),c=r(9521),t=r(4650),p=r(7579),g=r(727),h=r(6451),M=r(9646),m=r(3101),v=r(8675),F=r(3900),w=r(5698),k=r(2722),B=r(9300),U=r(1005),_=r(7340),S=r(4080),P=r(6895),y=r(3238),G=r(445),R=r(8184),X=r(3353),$=r(531);const z=["mat-menu-item",""];function V(o,l){1&o&&(t.O4$(),t.TgZ(0,"svg",2),t._UZ(1,"polygon",3),t.qZA())}const K=["*"];function J(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"div",0),t.NdJ("keydown",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s._handleKeydown(i))})("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.closed.emit("click"))})("@transformMenu.start",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s._onAnimationStart(i))})("@transformMenu.done",function(i){t.CHM(e);const s=t.oxw();return t.KtG(s._onAnimationDone(i))}),t.TgZ(1,"div",1),t.Hsn(2),t.qZA()()}if(2&o){const e=t.oxw();t.Q6J("id",e.panelId)("ngClass",e._classList)("@transformMenu",e._panelAnimationState),t.uIk("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}const A={transformMenu:(0,_.X$)("transformMenu",[(0,_.SB)("void",(0,_.oB)({opacity:0,transform:"scale(0.8)"})),(0,_.eR)("void => enter",(0,_.jt)("120ms cubic-bezier(0, 0, 0.2, 1)",(0,_.oB)({opacity:1,transform:"scale(1)"}))),(0,_.eR)("* => void",(0,_.jt)("100ms 25ms linear",(0,_.oB)({opacity:0})))]),fadeInItems:(0,_.X$)("fadeInItems",[(0,_.SB)("showing",(0,_.oB)({opacity:1})),(0,_.eR)("void => *",[(0,_.oB)({opacity:0}),(0,_.jt)("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])},H=new t.OlP("MatMenuContent");let Q=(()=>{class o{constructor(e,n,i,s,u,d,b){this._template=e,this._componentFactoryResolver=n,this._appRef=i,this._injector=s,this._viewContainerRef=u,this._document=d,this._changeDetectorRef=b,this._attached=new p.x}attach(e={}){var n;this._portal||(this._portal=new S.UE(this._template,this._viewContainerRef)),this.detach(),this._outlet||(this._outlet=new S.u0(this._document.createElement("div"),this._componentFactoryResolver,this._appRef,this._injector));const i=this._template.elementRef.nativeElement;i.parentNode.insertBefore(this._outlet.outletElement,i),null===(n=this._changeDetectorRef)||void 0===n||n.markForCheck(),this._portal.attach(this._outlet,e),this._attached.next()}detach(){this._portal.isAttached&&this._portal.detach()}ngOnDestroy(){this._outlet&&this._outlet.dispose()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.Rgc),t.Y36(t._Vd),t.Y36(t.z2F),t.Y36(t.zs3),t.Y36(t.s_b),t.Y36(P.K0),t.Y36(t.sBO))},o.\u0275dir=t.lG2({type:o}),o})(),q=(()=>{class o extends Q{}return o.\u0275fac=function(){let l;return function(n){return(l||(l=t.n5z(o)))(n||o)}}(),o.\u0275dir=t.lG2({type:o,selectors:[["ng-template","matMenuContent",""]],features:[t._Bn([{provide:H,useExisting:o}]),t.qOj]}),o})();const L=new t.OlP("MAT_MENU_PANEL"),ee=(0,y.Kr)((0,y.Id)(class{}));let x=(()=>{class o extends ee{constructor(e,n,i,s,u){var d;super(),this._elementRef=e,this._document=n,this._focusMonitor=i,this._parentMenu=s,this._changeDetectorRef=u,this.role="menuitem",this._hovered=new p.x,this._focused=new p.x,this._highlighted=!1,this._triggersSubmenu=!1,null==s||null===(d=s.addItem)||void 0===d||d.call(s,this)}focus(e,n){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,n):this._getHostElement().focus(n),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){var e;const n=this._elementRef.nativeElement.cloneNode(!0),i=n.querySelectorAll("mat-icon, .material-icons");for(let s=0;s<i.length;s++)i[s].remove();return(null===(e=n.textContent)||void 0===e?void 0:e.trim())||""}_setHighlighted(e){var n;this._highlighted=e,null===(n=this._changeDetectorRef)||void 0===n||n.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.SBq),t.Y36(P.K0),t.Y36(a.tE),t.Y36(L,8),t.Y36(t.sBO))},o.\u0275cmp=t.Xpm({type:o,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-focus-indicator"],hostVars:10,hostBindings:function(e,n){1&e&&t.NdJ("click",function(s){return n._checkDisabled(s)})("mouseenter",function(){return n._handleMouseEnter()}),2&e&&(t.uIk("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled.toString())("disabled",n.disabled||null),t.ekj("mat-menu-item",!0)("mat-menu-item-highlighted",n._highlighted)("mat-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{disabled:"disabled",disableRipple:"disableRipple",role:"role"},exportAs:["matMenuItem"],features:[t.qOj],attrs:z,ngContentSelectors:K,decls:3,vars:3,consts:[["matRipple","",1,"mat-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["class","mat-menu-submenu-icon","viewBox","0 0 5 10","focusable","false",4,"ngIf"],["viewBox","0 0 5 10","focusable","false",1,"mat-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(e,n){1&e&&(t.F$t(),t.Hsn(0),t._UZ(1,"div",0),t.YNc(2,V,2,0,"svg",1)),2&e&&(t.xp6(1),t.Q6J("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),t.xp6(1),t.Q6J("ngIf",n._triggersSubmenu))},dependencies:[P.O5,y.wG],encapsulation:2,changeDetection:0}),o})();const W=new t.OlP("mat-menu-default-options",{providedIn:"root",factory:function te(){return{overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"}}});let ne=0,C=(()=>{class o{constructor(e,n,i,s){this._elementRef=e,this._ngZone=n,this._defaultOptions=i,this._changeDetectorRef=s,this._xPosition=this._defaultOptions.xPosition,this._yPosition=this._defaultOptions.yPosition,this._directDescendantItems=new t.n_E,this._tabSubscription=g.w0.EMPTY,this._classList={},this._panelAnimationState="void",this._animationDone=new p.x,this.overlayPanelClass=this._defaultOptions.overlayPanelClass||"",this.backdropClass=this._defaultOptions.backdropClass,this._overlapTrigger=this._defaultOptions.overlapTrigger,this._hasBackdrop=this._defaultOptions.hasBackdrop,this.closed=new t.vpe,this.close=this.closed,this.panelId="mat-menu-panel-"+ne++}get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}get overlapTrigger(){return this._overlapTrigger}set overlapTrigger(e){this._overlapTrigger=(0,f.Ig)(e)}get hasBackdrop(){return this._hasBackdrop}set hasBackdrop(e){this._hasBackdrop=(0,f.Ig)(e)}set panelClass(e){const n=this._previousPanelClass;n&&n.length&&n.split(" ").forEach(i=>{this._classList[i]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(i=>{this._classList[i]=!0}),this._elementRef.nativeElement.className="")}get classList(){return this.panelClass}set classList(e){this.panelClass=e}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new a.Em(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._tabSubscription=this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe((0,v.O)(this._directDescendantItems),(0,F.w)(e=>(0,h.T)(...e.map(n=>n._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{var n;const i=this._keyManager;if("enter"===this._panelAnimationState&&null!==(n=i.activeItem)&&void 0!==n&&n._hasFocus()){const s=e.toArray(),u=Math.max(0,Math.min(s.length-1,i.activeItemIndex||0));s[u]&&!s[u].disabled?i.setActiveItem(u):i.setNextItemActive()}})}ngOnDestroy(){this._directDescendantItems.destroy(),this._tabSubscription.unsubscribe(),this.closed.complete()}_hovered(){return this._directDescendantItems.changes.pipe((0,v.O)(this._directDescendantItems),(0,F.w)(n=>(0,h.T)(...n.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){const n=e.keyCode,i=this._keyManager;switch(n){case c.hY:(0,c.Vb)(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case c.oh:this.parentMenu&&"ltr"===this.direction&&this.closed.emit("keydown");break;case c.SV:this.parentMenu&&"rtl"===this.direction&&this.closed.emit("keydown");break;default:return(n===c.LH||n===c.JH)&&i.setFocusOrigin("keyboard"),void i.onKeydown(e)}e.stopPropagation()}focusFirstItem(e="program"){this._ngZone.onStable.pipe((0,w.q)(1)).subscribe(()=>{let n=null;if(this._directDescendantItems.length&&(n=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),!n||!n.contains(document.activeElement)){const i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&n&&n.focus()}})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){const n=Math.min(this._baseElevation+e,24),i=`${this._elevationPrefix}${n}`,s=Object.keys(this._classList).find(u=>u.startsWith(this._elevationPrefix));(!s||s===this._previousElevation)&&(this._previousElevation&&(this._classList[this._previousElevation]=!1),this._classList[i]=!0,this._previousElevation=i)}setPositionClasses(e=this.xPosition,n=this.yPosition){var i;const s=this._classList;s["mat-menu-before"]="before"===e,s["mat-menu-after"]="after"===e,s["mat-menu-above"]="above"===n,s["mat-menu-below"]="below"===n,null===(i=this._changeDetectorRef)||void 0===i||i.markForCheck()}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(e){this._animationDone.next(e),this._isAnimating=!1}_onAnimationStart(e){this._isAnimating=!0,"enter"===e.toState&&0===this._keyManager.activeItemIndex&&(e.element.scrollTop=0)}_updateDirectDescendants(){this._allItems.changes.pipe((0,v.O)(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(n=>n._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.SBq),t.Y36(t.R0b),t.Y36(W),t.Y36(t.sBO))},o.\u0275dir=t.lG2({type:o,contentQueries:function(e,n,i){if(1&e&&(t.Suo(i,H,5),t.Suo(i,x,5),t.Suo(i,x,4)),2&e){let s;t.iGM(s=t.CRH())&&(n.lazyContent=s.first),t.iGM(s=t.CRH())&&(n._allItems=s),t.iGM(s=t.CRH())&&(n.items=s)}},viewQuery:function(e,n){if(1&e&&t.Gf(t.Rgc,5),2&e){let i;t.iGM(i=t.CRH())&&(n.templateRef=i.first)}},inputs:{backdropClass:"backdropClass",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedby:["aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:"overlapTrigger",hasBackdrop:"hasBackdrop",panelClass:["class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"}}),o})(),ie=(()=>{class o extends C{constructor(e,n,i,s){super(e,n,i,s),this._elevationPrefix="mat-elevation-z",this._baseElevation=4}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.SBq),t.Y36(t.R0b),t.Y36(W),t.Y36(t.sBO))},o.\u0275cmp=t.Xpm({type:o,selectors:[["mat-menu"]],hostVars:3,hostBindings:function(e,n){2&e&&t.uIk("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},exportAs:["matMenu"],features:[t._Bn([{provide:L,useExisting:o}]),t.qOj],ngContentSelectors:K,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-menu-panel",3,"id","ngClass","keydown","click"],[1,"mat-menu-content"]],template:function(e,n){1&e&&(t.F$t(),t.YNc(0,J,3,6,"ng-template"))},dependencies:[P.mk],styles:['mat-menu{display:none}.mat-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;max-height:calc(100vh - 48px);border-radius:4px;outline:0;min-height:64px;position:relative}.mat-menu-panel.ng-animating{pointer-events:none}.cdk-high-contrast-active .mat-menu-panel{outline:solid 1px}.mat-menu-content:not(:empty){padding-top:8px;padding-bottom:8px}.mat-menu-item{-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative}.mat-menu-item::-moz-focus-inner{border:0}.mat-menu-item[disabled]{cursor:default}[dir=rtl] .mat-menu-item{text-align:right}.mat-menu-item .mat-icon{margin-right:16px;vertical-align:middle}.mat-menu-item .mat-icon svg{vertical-align:top}[dir=rtl] .mat-menu-item .mat-icon{margin-left:16px;margin-right:0}.mat-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.cdk-high-contrast-active .mat-menu-item{margin-top:1px}.mat-menu-item-submenu-trigger{padding-right:32px}[dir=rtl] .mat-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}.mat-menu-submenu-icon{position:absolute;top:50%;right:16px;transform:translateY(-50%);width:5px;height:10px;fill:currentColor}[dir=rtl] .mat-menu-submenu-icon{right:auto;left:16px;transform:translateY(-50%) scaleX(-1)}.cdk-high-contrast-active .mat-menu-submenu-icon{fill:CanvasText}button.mat-menu-item{width:100%}.mat-menu-item .mat-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}'],encapsulation:2,data:{animation:[A.transformMenu,A.fadeInItems]},changeDetection:0}),o})();const N=new t.OlP("mat-menu-scroll-strategy"),oe={provide:N,deps:[R.aV],useFactory:function se(o){return()=>o.scrollStrategies.reposition()}},j=(0,X.i$)({passive:!0});let ae=(()=>{class o{constructor(e,n,i,s,u,d,b,O,D){this._overlay=e,this._element=n,this._viewContainerRef=i,this._menuItemInstance=d,this._dir=b,this._focusMonitor=O,this._ngZone=D,this._overlayRef=null,this._menuOpen=!1,this._closingActionsSubscription=g.w0.EMPTY,this._hoverSubscription=g.w0.EMPTY,this._menuCloseSubscription=g.w0.EMPTY,this._handleTouchStart=I=>{(0,a.yG)(I)||(this._openedBy="touch")},this._openedBy=void 0,this.restoreFocus=!0,this.menuOpened=new t.vpe,this.onMenuOpen=this.menuOpened,this.menuClosed=new t.vpe,this.onMenuClose=this.menuClosed,this._scrollStrategy=s,this._parentMaterialMenu=u instanceof C?u:void 0,n.nativeElement.addEventListener("touchstart",this._handleTouchStart,j),d&&(d._triggersSubmenu=this.triggersSubmenu())}get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){e!==this._menu&&(this._menu=e,this._menuCloseSubscription.unsubscribe(),e&&(this._menuCloseSubscription=e.close.subscribe(n=>{this._destroyMenu(n),("click"===n||"tab"===n)&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(n)})))}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._element.nativeElement.removeEventListener("touchstart",this._handleTouchStart,j),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._hoverSubscription.unsubscribe()}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}triggersSubmenu(){return!(!this._menuItemInstance||!this._parentMaterialMenu)}toggleMenu(){return this._menuOpen?this.closeMenu():this.openMenu()}openMenu(){const e=this.menu;if(this._menuOpen||!e)return;const n=this._createOverlay(e),i=n.getConfig(),s=i.positionStrategy;this._setPosition(e,s),i.hasBackdrop=e.hasBackdrop??!this.triggersSubmenu(),n.attach(this._getPortal(e)),e.lazyContent&&e.lazyContent.attach(this.menuData),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this.closeMenu()),this._initMenu(e),e instanceof C&&(e._startAnimation(),e._directDescendantItems.changes.pipe((0,k.R)(e.close)).subscribe(()=>{s.withLockedPosition(!1).reapplyLastPosition(),s.withLockedPosition(!0)}))}closeMenu(){var e;null===(e=this.menu)||void 0===e||e.close.emit()}focus(e,n){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,n):this._element.nativeElement.focus(n)}updatePosition(){var e;null===(e=this._overlayRef)||void 0===e||e.updatePosition()}_destroyMenu(e){if(!this._overlayRef||!this.menuOpen)return;const n=this.menu;var i;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),this.restoreFocus&&("keydown"===e||!this._openedBy||!this.triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,n instanceof C?(n._resetAnimation(),n.lazyContent?n._animationDone.pipe((0,B.h)(s=>"void"===s.toState),(0,w.q)(1),(0,k.R)(n.lazyContent._attached)).subscribe({next:()=>n.lazyContent.detach(),complete:()=>this._setIsMenuOpen(!1)}):this._setIsMenuOpen(!1)):(this._setIsMenuOpen(!1),null==n||null===(i=n.lazyContent)||void 0===i||i.detach())}_initMenu(e){e.parentMenu=this.triggersSubmenu()?this._parentMaterialMenu:void 0,e.direction=this.dir,this._setMenuElevation(e),e.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0)}_setMenuElevation(e){if(e.setElevation){let n=0,i=e.parentMenu;for(;i;)n++,i=i.parentMenu;e.setElevation(n)}}_setIsMenuOpen(e){this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this.triggersSubmenu()&&this._menuItemInstance._setHighlighted(e)}_createOverlay(e){if(!this._overlayRef){const n=this._getOverlayConfig(e);this._subscribeToPositions(e,n.positionStrategy),this._overlayRef=this._overlay.create(n),this._overlayRef.keydownEvents().subscribe()}return this._overlayRef}_getOverlayConfig(e){return new R.X_({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir})}_subscribeToPositions(e,n){e.setPositionClasses&&n.positionChanges.subscribe(i=>{const s="start"===i.connectionPair.overlayX?"after":"before",u="top"===i.connectionPair.overlayY?"below":"above";this._ngZone?this._ngZone.run(()=>e.setPositionClasses(s,u)):e.setPositionClasses(s,u)})}_setPosition(e,n){let[i,s]="before"===e.xPosition?["end","start"]:["start","end"],[u,d]="above"===e.yPosition?["bottom","top"]:["top","bottom"],[b,O]=[u,d],[D,I]=[i,s],T=0;if(this.triggersSubmenu()){if(I=i="before"===e.xPosition?"start":"end",s=D="end"===i?"start":"end",this._parentMaterialMenu){if(null==this._parentInnerPadding){const Z=this._parentMaterialMenu.items.first;this._parentInnerPadding=Z?Z._getHostElement().offsetTop:0}T="bottom"===u?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(b="top"===u?"bottom":"top",O="top"===d?"bottom":"top");n.withPositions([{originX:i,originY:b,overlayX:D,overlayY:u,offsetY:T},{originX:s,originY:b,overlayX:I,overlayY:u,offsetY:T},{originX:i,originY:O,overlayX:D,overlayY:d,offsetY:-T},{originX:s,originY:O,overlayX:I,overlayY:d,offsetY:-T}])}_menuClosingActions(){const e=this._overlayRef.backdropClick(),n=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:(0,M.of)(),s=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe((0,B.h)(u=>u!==this._menuItemInstance),(0,B.h)(()=>this._menuOpen)):(0,M.of)();return(0,h.T)(e,i,s,n)}_handleMousedown(e){(0,a.X6)(e)||(this._openedBy=0===e.button?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){const n=e.keyCode;(n===c.K5||n===c.L_)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(n===c.SV&&"ltr"===this.dir||n===c.oh&&"rtl"===this.dir)&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){!this.triggersSubmenu()||!this._parentMaterialMenu||(this._hoverSubscription=this._parentMaterialMenu._hovered().pipe((0,B.h)(e=>e===this._menuItemInstance&&!e.disabled),(0,U.g)(0,m.E)).subscribe(()=>{this._openedBy="mouse",this.menu instanceof C&&this.menu._isAnimating?this.menu._animationDone.pipe((0,w.q)(1),(0,U.g)(0,m.E),(0,k.R)(this._parentMaterialMenu._hovered())).subscribe(()=>this.openMenu()):this.openMenu()}))}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new S.UE(e.templateRef,this._viewContainerRef)),this._portal}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(R.aV),t.Y36(t.SBq),t.Y36(t.s_b),t.Y36(N),t.Y36(L,8),t.Y36(x,10),t.Y36(G.Is,8),t.Y36(a.tE),t.Y36(t.R0b))},o.\u0275dir=t.lG2({type:o,hostVars:3,hostBindings:function(e,n){1&e&&t.NdJ("click",function(s){return n._handleClick(s)})("mousedown",function(s){return n._handleMousedown(s)})("keydown",function(s){return n._handleKeydown(s)}),2&e&&t.uIk("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen||null)("aria-controls",n.menuOpen?n.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:["mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:["matMenuTriggerFor","menu"],menuData:["matMenuTriggerData","menuData"],restoreFocus:["matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"}}),o})(),re=(()=>{class o extends ae{}return o.\u0275fac=function(){let l;return function(n){return(l||(l=t.n5z(o)))(n||o)}}(),o.\u0275dir=t.lG2({type:o,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-menu-trigger"],exportAs:["matMenuTrigger"],features:[t.qOj]}),o})(),le=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[oe],imports:[P.ez,y.BQ,y.si,R.U8,$.ZD,y.BQ]}),o})()}}]);