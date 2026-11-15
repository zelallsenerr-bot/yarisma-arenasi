package com.yarismaatolyesi.arena;

import android.app.Activity;
import java.io.IOException;
import java.io.ByteArrayInputStream;
import java.util.Collections;
import android.app.AlertDialog;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.*;
import android.widget.*;

public class MainActivity extends Activity {
 private static final String HOST = "appassets.androidplatform.net";
 private static final String HOME = "https://" + HOST + "/";
 private WebView web;
 private FrameLayout root;
 private LinearLayout error;
 private ProgressBar progress;
 private View fullscreen;
 private WebChromeClient.CustomViewCallback fullCallback;
 private boolean failed;

 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  getWindow().setStatusBarColor(Color.rgb(23,16,47));
  getWindow().setNavigationBarColor(Color.rgb(23,16,47));
  root = new FrameLayout(this);
  root.setBackgroundColor(Color.rgb(23,16,47));
  if (android.os.Build.VERSION.SDK_INT >= 30) root.setOnApplyWindowInsetsListener((v,insets)-> {
   android.graphics.Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
   v.setPadding(bars.left,bars.top,bars.right,bars.bottom); return insets;
  });
  // The insets API above is available from Android 11; older devices use fitsSystemWindows.
  if (android.os.Build.VERSION.SDK_INT < 30) {
   root.setOnApplyWindowInsetsListener(null); root.setFitsSystemWindows(true);
  }
  web = new WebView(this);
  root.addView(web,new FrameLayout.LayoutParams(-1,-1));
  WebSettings settings = web.getSettings();
  settings.setJavaScriptEnabled(true);
  settings.setDomStorageEnabled(true);
  settings.setMediaPlaybackRequiresUserGesture(true);
  settings.setAllowFileAccess(false);
  settings.setAllowContentAccess(false);
  settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  web.setBackgroundColor(Color.rgb(23,16,47));
  progress = new ProgressBar(this,null,android.R.attr.progressBarStyleHorizontal);
  root.addView(progress,new FrameLayout.LayoutParams(-1,8));
  error = new LinearLayout(this); error.setOrientation(LinearLayout.VERTICAL);
  error.setGravity(android.view.Gravity.CENTER); error.setPadding(40,40,40,40);
  error.setBackgroundColor(Color.rgb(23,16,47));
  TextView title = new TextView(this); title.setText("Oyun açılamadı"); title.setTextColor(Color.WHITE); title.setTextSize(23);
  TextView hint = new TextView(this); hint.setText("Oyun dosyası açılamadı. Yeniden dene."); hint.setTextColor(Color.LTGRAY); hint.setPadding(0,24,0,32);
  Button retry = new Button(this); retry.setText("Yeniden dene"); retry.setOnClickListener(v -> web.loadUrl(HOME));
  error.addView(title); error.addView(hint); error.addView(retry);
  root.addView(error,new FrameLayout.LayoutParams(-1,-1)); error.setVisibility(View.GONE);
  web.setWebViewClient(new WebViewClient() {
   @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
    Uri uri = request.getUrl();
    if (!isGameOrigin(uri)) return missingAsset();
    String path = uri.getPath();
    if ("/".equals(path)) path = "/index.html";
    if (path == null || !path.matches("/[a-z]+[.](html|css|js)")) return missingAsset();
    String mime = path.endsWith(".js") ? "text/javascript" : path.endsWith(".css") ? "text/css" : "text/html";
    try {
     return new WebResourceResponse(mime, "UTF-8", getAssets().open(path.substring(1)));
    } catch (IOException error) {
     return missingAsset();
    }
   }
   @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
    return !isGameOrigin(req.getUrl());
   }
   @Override public void onPageStarted(WebView view,String url,android.graphics.Bitmap icon) { failed=false; error.setVisibility(View.GONE); progress.setVisibility(View.VISIBLE); }
   @Override public void onPageFinished(WebView view,String url) { progress.setVisibility(View.GONE); if(!failed) error.setVisibility(View.GONE); }
   @Override public void onReceivedError(WebView view,WebResourceRequest request,WebResourceError e) { if(request.isForMainFrame()) showError(); }
   @Override public void onReceivedHttpError(WebView view,WebResourceRequest request,WebResourceResponse response) { if(request.isForMainFrame()) showError(); }
  });
  web.setWebChromeClient(new WebChromeClient() {
   @Override public void onProgressChanged(WebView view,int value) { progress.setProgress(value); }
   @Override public void onShowCustomView(View view,CustomViewCallback callback) {
    if(fullscreen!=null) { callback.onCustomViewHidden(); return; }
    fullscreen=view; fullCallback=callback; root.addView(view,new FrameLayout.LayoutParams(-1,-1)); web.setVisibility(View.GONE);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
   }
   @Override public void onHideCustomView() { closeFullscreen(); }
  });
  setContentView(root);
  if (android.os.Build.VERSION.SDK_INT >= 33) {
   getOnBackInvokedDispatcher().registerOnBackInvokedCallback(android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::handleBack);
  }
  if(state==null || web.restoreState(state)==null) web.loadUrl(HOME);
 }
 private static boolean isGameOrigin(Uri uri) {
  return "https".equals(uri.getScheme()) && HOST.equals(uri.getHost()) && uri.getPort() == -1;
 }
 private static WebResourceResponse missingAsset() {
  return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found",
   Collections.emptyMap(), new ByteArrayInputStream(new byte[0]));
 }
 private void showError() { failed=true; progress.setVisibility(View.GONE); error.setVisibility(View.VISIBLE); }
 private void closeFullscreen() {
  if(fullscreen==null) return;
  root.removeView(fullscreen); fullscreen=null; web.setVisibility(View.VISIBLE);
  getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  if(fullCallback!=null) { fullCallback.onCustomViewHidden(); fullCallback=null; }
 }
 @Override public void onBackPressed() { handleBack(); }
 private void handleBack() {
  if(fullscreen!=null) { closeFullscreen(); return; }
  if(web.canGoBack()) { web.goBack(); return; }
  new AlertDialog.Builder(this).setMessage("Yarışma Atölyesi kapatılsın mı?").setPositiveButton("Çık",(d,w)->finish()).setNegativeButton("Devam et",null).show();
 }
 @Override protected void onSaveInstanceState(Bundle state) { web.saveState(state); super.onSaveInstanceState(state); }
 @Override protected void onPause() { web.onPause(); super.onPause(); }
 @Override protected void onResume() { super.onResume(); if(web!=null) web.onResume(); }
 @Override protected void onDestroy() { if(web!=null) { root.removeView(web); web.destroy(); } super.onDestroy(); }
}
