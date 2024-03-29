<?php
/**
 * Magento Support Team.
 * @category   MST
 * @package    MST_Pdp
 * @version    2.0
 * @author     Magebay Developer Team <info@magebay.com>
 * @copyright  Copyright (c) 2009-2013 MAGEBAY.COM. (http://www.magebay.com)
 */
class MST_Pdp_Model_Observer extends Varien_Object
{
    public function catalogProductLoadAfter(Varien_Event_Observer $observer)
    {
        // set the additional options on the product
        $action = Mage::app()->getFrontController()->getAction();
        if ($action->getFullActionName() == 'checkout_cart_add')
        {
            // assuming you are posting your custom form values in an array called extra_options...
            $extraOption = $action->getRequest()->getParam('extra_options');
            if ($extraOption != "")
            {
                $product = $observer->getProduct();
                // add to the additional options array
                $additionalOptions = array();
                if ($additionalOption = $product->getCustomOption('additional_options'))
                {
                    $additionalOptions = (array) unserialize($additionalOption->getValue());
                }
                $additionalOptions[] = array(
                    'code' => 'pdpinfo',
                    'label' => '',
                    'value' => '',
                    'json' => $extraOption,
                	'time' => microtime()
                );
                // add the additional options array with the option code additional_options
                $observer->getProduct()
                    ->addCustomOption('additional_options', serialize($additionalOptions));
            }
        }
    }
    public function quoteProductAddAfter(Varien_Event_Observer $observer) {
        /*$action = Mage::app()->getFrontController()->getAction();
        $params = $action->getRequest()->getParams();
        $items = $observer->getItems();
        foreach ($items as $item) {
            if ($item->getItemId() == $params['id']) {
                $options = $item->getOptions();
                foreach ($options as $option){
                    if($option->getCode()=='info_buyRequest'){
                        $buyRequestInfo = unserialize($option->getValue());
                        $buyRequestInfo['extra_options'] = $params['extra_options'];
                        $option->setValue(serialize($buyRequestInfo));
                    }
                }
                $additionalOptions[] = array(
                    'code' => 'pdpinfo',
                    'label' => 'Update Option',
                    'value' => 'lalala',
                    'json' => $buyRequestInfo['extra_options']
                );
                $item->setProductOptions($additionalOptions);
                $item->save();
            }
        }*/
        //die('Cart Will Not Update Right Now');
    }
    /**Update extra_option value in buy request ưhen edit cart item**/
    public function quoteItemSetProduct(Varien_Event_Observer $observer) {
        $action = Mage::app()->getFrontController()->getAction();
        $extraOption = $action->getRequest()->getParam('extra_options');
        $itemId = $action->getRequest()->getParam('id');
        $moduleName = Mage::app()->getRequest()->getModuleName();
        $actionName = Mage::app()->getRequest()->getActionName();
        if ($moduleName == "checkout" && $actionName == "updateItemOptions") {
            $item = $observer->getQuoteItem();
            Zend_Debug::dump(get_class_methods($item));
            die;
        }
    }
    public function salesConvertQuoteItemToOrderItem(Varien_Event_Observer $observer)
    {
        $quoteItem = $observer->getItem();
        if ($additionalOptions = $quoteItem->getOptionByCode('additional_options')) {
            $orderItem = $observer->getOrderItem();
            $options = $orderItem->getProductOptions();
            $options['additional_options'] = unserialize($additionalOptions->getValue());
            $orderItem->setProductOptions($options);
        }
    }
    public function checkoutCartProductAddAfter(Varien_Event_Observer $observer)
    {
        $action = Mage::app()->getFrontController()->getAction();
        if ($action->getFullActionName() == 'sales_order_reorder')
        {
            $item = $observer->getQuoteItem();
            $buyInfo = $item->getBuyRequest();
            if ($options = $buyInfo->getExtraOptions())
            {
                $additionalOptions = array();
                if ($additionalOption = $item->getOptionByCode('additional_options'))
                {
                    $additionalOptions = (array) unserialize($additionalOption->getValue());
                }
                foreach ($options as $key => $value)
                {
                    $additionalOptions[] = array(
                        'label' => $key,
                        'value' => $value,
                    );
                }
                $item->addOption(array(
                    'code' => 'additional_options',
                    'value' => serialize($additionalOptions)
                ));
            }
        }
    }
}