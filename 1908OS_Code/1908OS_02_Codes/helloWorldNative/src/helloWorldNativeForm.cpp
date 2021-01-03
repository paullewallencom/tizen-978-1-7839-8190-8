#include "helloWorldNativeForm.h"
#include "AppResourceId.h"

using namespace Tizen::Base;
using namespace Tizen::App;
using namespace Tizen::Ui;
using namespace Tizen::Ui::Controls;

helloWorldNativeForm::helloWorldNativeForm(void)
{
}

helloWorldNativeForm::~helloWorldNativeForm(void)
{
}

bool
helloWorldNativeForm::Initialize(void)
{
	result r = Construct(IDL_FORM);
	TryReturn(r == E_SUCCESS, false, "Failed to construct form");

	return true;
}
result
helloWorldNativeForm::OnInitializing(void)
{
	result r = E_SUCCESS;

	// TODO: Add your initialization code here

	// Setup back event listener
	SetFormBackEventListener(this);

	// Get a button via resource ID
	Tizen::Ui::Controls::Button* pButtonOk = static_cast< Button* >(GetControl(IDC_BUTTON_OK));
	if (pButtonOk != null)
	{
		pButtonOk->SetActionId(IDA_BUTTON_OK);
		pButtonOk->AddActionEventListener(*this);
	}

	return r;
}

result
helloWorldNativeForm::OnTerminating(void)
{
	result r = E_SUCCESS;

	// TODO: Add your termination code here

	return r;
}

void
helloWorldNativeForm::OnActionPerformed(const Tizen::Ui::Control& source, int actionId)
{
	switch(actionId)
	{
	case IDA_BUTTON_OK:
		AppLog("OK Button is clicked!\n");
		break;
	default:
		break;
	}
}

void
helloWorldNativeForm::OnFormBackRequested(Tizen::Ui::Controls::Form& source)
{
	UiApp* pApp = UiApp::GetInstance();
	AppAssert(pApp);
	pApp->Terminate();
}


