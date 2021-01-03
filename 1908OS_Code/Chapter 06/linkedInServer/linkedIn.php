<?php
$sApiKey = '';
$sApiSecret = '';
$sAppState = '';
$sAppRedirectUri = '';
$sAuthoricationCode = (isset($_GET['code'])) ? $_GET['code'] : '';
$sState = (isset($_GET['state'])) ? $_GET['state'] : '';
if ($sAppState != $sState) {
	die('Cross-site request forgery detected.');
}
$sUrl = "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&redirect_uri={$sAppRedirectUri}&client_id={$sApiKey}&client_secret={$sApiSecret}&code={$sAuthoricationCode}";
$data = file_get_contents($sUrl);
if (FALSE === $data) {
	die('Unable to retrieve access token.');
}
$data = json_decode($data);
echo 'Access token: '.$data->access_token;
?>
