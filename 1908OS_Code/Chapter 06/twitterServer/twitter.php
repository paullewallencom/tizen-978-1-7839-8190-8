<?php
$sApiKey = '';
$sApiSecret = '';
$sAccessToken = '';
$sAccessTokenSecret = '';

session_start();
require_once("twitteroauth/twitteroauth/twitteroauth.php"); 
 
$twitter = new TwitterOAuth($sApiKey, $sApiSecret, $sAccessToken, $sAccessTokenSecret);
$result = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=%23tizen&count=10&result_type=recent');
print json_encode($result);
?>
