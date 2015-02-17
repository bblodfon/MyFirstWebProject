<?php

//get the variables you want
$id=$_GET['id'];
$desc=$_GET['desc'];
$cost=$_GET['cost'];
echo "$id\n$desc\n$cost\n";

//load the XML file
if(!$xml=simplexml_load_file('products.xml')){
    trigger_error('Error reading XML file',E_USER_ERROR);
}

// Add the product and its parameters!!!
$productNode = $xml->addChild('product');
$productNode->addChild('id',$id);
$productNode->addChild('desc',$desc);
$productNode->addChild('cost',$cost);

// Display the new XML code in the console
echo $xml->asXML();
// It badly formatted! change that with:
$formattedXML = xmlpp($xml->asXML(),false);
echo $formattedXML;

// Store new XML code
//$formattedXML->asXML("products.xml");
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

