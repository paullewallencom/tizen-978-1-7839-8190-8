#include <new>
#include "helloWorldNativeFrame.h"
#include "helloWorldNativeForm.h"

using namespace Tizen::Base;
using namespace Tizen::Ui;
using namespace Tizen::Ui::Controls;

helloWorldNativeFrame::helloWorldNativeFrame(void)
{
}

helloWorldNativeFrame::~helloWorldNativeFrame(void)
{
}

result
helloWorldNativeFrame::OnInitializing(void)
{
	result r = E_SUCCESS;

	// Create a form
	helloWorldNativeForm* phelloWorldNativeForm = new (std::nothrow) helloWorldNativeForm();
	TryReturn(phelloWorldNativeForm != null, false, "The memory is insufficient.");
	phelloWorldNativeForm->Initialize();

	// Add the form to the frame
	AddControl(phelloWorldNativeForm);

	// Set the current form
	SetCurrentForm(phelloWorldNativeForm);

	// Draw the form
	phelloWorldNativeForm->Invalidate(true);

	// TODO: Add your frame initialization code here.

	return r;
}

result
helloWorldNativeFrame::OnTerminating(void)
{
	result r = E_SUCCESS;

	// TODO: Add your frame termination code here.
	return r;
}


