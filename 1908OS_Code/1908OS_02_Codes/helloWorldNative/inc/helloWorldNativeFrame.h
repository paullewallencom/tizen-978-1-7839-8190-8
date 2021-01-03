#ifndef _HELLO_WORLD_NATIVE_FRAME_H_
#define _HELLO_WORLD_NATIVE_FRAME_H_

#include <FApp.h>
#include <FBase.h>
#include <FSystem.h>
#include <FUi.h>
#include <FUiIme.h>
#include <FGraphics.h>
#include <gl.h>

class helloWorldNativeFrame
	: public Tizen::Ui::Controls::Frame
{
public:
	helloWorldNativeFrame(void);
	virtual ~helloWorldNativeFrame(void);

private:
	virtual result OnInitializing(void);
	virtual result OnTerminating(void);
};

#endif	//_HELLO_WORLD_NATIVEFRAME_H_
