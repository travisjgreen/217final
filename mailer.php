<?php
/**
 * Created by PhpStorm.
 * User: Travis
 * Date: 11/30/2014
 * Time: 9:04 PM
 */
$order = json_decode($_POST["order"]);
$message = "Toppings: " . implode(", ", array_map('ucfirst', $order->toppings)) . "\n";
$message .= "Crust: " . implode(", ", array_map('ucfirst', $order->crust)) . "\n";
$message .= "Drinks: " . implode(", ", array_map('ucfirst', $order->drinks));

mail("travis.green64@gmail.com", "Pizza Order", $message, "From: Mom and Pop Pizza <no-reply@travisjgreen.com>\r\nCc: 217cis@gmail.com");

echo "Your order has been placed!";