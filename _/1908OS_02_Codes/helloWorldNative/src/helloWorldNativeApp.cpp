#include <new>
#include "helloWorldNativeApp.h"
#include "helloWorldNativeFrame.h"

using namespace Tizen::App;
using namespace Tizen::System;

helloWorldNativeApp::helloWorldNativeApp(void)
{
}

helloWorldNativeApp::~helloWorldNativeApp(void)
{
}

UiApp*
helloWorldNativeApp::CreateInstance(void)
{
	// TODO: Create the application instance through the constructor.
	return new (std::nothrow) helloWorldNativeApp();
}

bool
helloWorldNativeApp::OnAppInitializing(AppRegistry& appRegistry)
{
	// TODO: Initialize application-specific data.
	// The permanent data and context of the application can be obtained from the application registry (appRegistry).
	//
	// If this method is successful, return true; otherwise, return false and the application is terminated.


	// Uncomment the following statement to listen to the screen on and off events:
	// PowerManager::SetScreenEventListener(*this);

	return true;
}

bool
helloWorldNativeApp::OnAppInitialized(void)
{
	// TODO: Create the application frame.

	helloWorldNativeFrame* phelloWorldNativeFrame = new (std::nothrow) helloWorldNativeFrame;
	TryReturn(phelloWorldNativeFrame != null, false, "The memory is insufficient.");
	phelloWorldNativeFrame->Construct();
	phelloWorldNativeFrame->SetName(L"helloWorldNative");
	AddFrame(*phelloWorldNativeFrame);

	return true;
}

bool
helloWorldNativeApp::OnAppWillTerminate(void)
{
	// TODO: Deallocate or release resources in devices that have the END key.
	return true;
}

bool
helloWorldNativeApp::OnAppTerminating(AppRegistry& appRegistry, bool forcedTermination)
{
	// TODO: Deallocate all resources allocated by the application.
	// The permanent data and context of the application can be saved through the application registry (appRegistry).
	return true;
}

void
helloWorldNativeApp::OnForeground(void)
{
	// TODO: Start or resume drawing when the application is moved to the foreground.
}

void
helloWorldNativeApp::OnBackground(void)
{
	// TODO: Stop drawing when the application is moved to the background to save the CPU and battery consumption.
}

void
helloWorldNativeApp::OnLowMemory(void)
{
	// TODO: Free unnecessary resources or close the application.
}

void
helloWorldNativeApp::OnBatteryLevelChanged(BatteryLevel batteryLevel)
{
	// TODO: Handle all battery level changes here.
	// Stop using multimedia features (such as camera and mp3 playback) if the battery level is CRITICAL.
}

void
helloWorldNativeApp::OnScreenOn(void)
{
	// TODO: Retrieve the released resources or resume the operations that were paused or stopped in the OnScreenOff() event handler.
}

void
helloWorldNativeApp::OnScreenOff(void)
{
	// TODO: Release resources (such as 3D, media, and sensors) to allow the device to enter the sleep mode 
	// to save the battery (unless you have a good reason to do otherwise).
	// Only perform quick operations in this event handler. Any lengthy operations can be risky; 
	// for example, invoking a long asynchronous method within this event handler can cause problems
	// because the device can enter the sleep mode before the callback is invoked.

}
