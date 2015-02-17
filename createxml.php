<?php

//get the variables you want
$id=$_GET['id'];
$desc=$_GET['desc'];
$cost=$_GET['cost'];
echo "$id\n$desc\n$cost\n";
echo "EIMAI MESA STIN CREATE XML!\n";

//load the XML file
if(!$xml=simplexml_load_file('products.xml')){
    trigger_error('Error reading XML file',E_USER_ERROR);
}

// bale se pinaka ola ta product tags
$elementsToRemove = array();
foreach ($xml as $product) {
        $elementsToRemove[] = $product;
}

// diagrapse ta!!!
foreach ($elementsToRemove as $product) {
    unset($product[0]);
}

// Add the specific adidas product and its parameters!!!
$adidas_product = $xml->addChild('product');
$adidas_product->addChild('id',$id);
$adidas_product->addChild('desc',$desc);
$adidas_product->addChild('cost',$cost);

// It badly formatted! change that with:
$formattedXML = xmlpp($xml->asXML(),false);
echo $formattedXML;

// Store new XML code
$file = fopen ('products.xml', "w"); 
fwrite($file, $formattedXML); 
fclose ($file);

function xmlpp($xml, $html_output=false) {  
    $xml_obj = new SimpleXMLElement($xml);  
    $level = 4;  // ena tab gamaei!!!
    $indent = 0; // current indentation level  
    $pretty = array();  
      
    // get an array containing each XML element  
    $xml = explode("\n", preg_replace('/>\s*</', ">\n<", $xml_obj->asXML()));  
  
    // shift off opening XML tag if present  
    if (count($xml) && preg_match('/^<\?\s*xml/', $xml[0])) {  
      $pretty[] = array_shift($xml);  
    }  
  
    foreach ($xml as $el) {  
      if (preg_match('/^<([\w])+[^>\/]*>$/U', $el)) {  
          // opening tag, increase indent  
          $pretty[] = str_repeat(' ', $indent) . $el;  
          $indent += $level;  
      } else {  
        if (preg_match('/^<\/.+>$/', $el)) {              
          $indent -= $level;  // closing tag, decrease indent  
        }  
        if ($indent < 0) {  
          $indent += $level;  
        }  
        $pretty[] = str_repeat(' ', $indent) . $el;  
      }  
    }     
    $xml = implode("\n", $pretty);     
    return ($html_output) ? htmlentities($xml) : $xml;  
}
?>

