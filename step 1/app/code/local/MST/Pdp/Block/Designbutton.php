<?php
class MST_Pdp_Block_Designbutton extends Mage_Core_Block_Template
{
    protected $_currentAction;
	protected $_shareId;
    protected $_extraOption;
    protected $_params;
    public function __construct() {
        $this->_params = Mage::app()->getRequest()->getParams();
        if (isset($this->_params['action'])) {
            $this->_currentAction = $this->_params['action'];
        }
        if (isset($this->_params['share'])) {
            $this->_shareId = $this->_params['share'];
        }
    }
	public function getCurrentProduct() {
        $params = $this->_params;
        $currentProduct =  Mage::registry('current_product');
        if ($currentProduct != NULL) {
            return $currentProduct;
        } else {
            if (isset($params['product-id'])) {
                $productId = $params['product-id'];
                $currentProduct = Mage::getModel('catalog/product')->load($productId);
                return $currentProduct;
            }
        }
        return null;
    }
    public function getProductId() {
        $currentProduct = $this->getCurrentProduct();
        if ($currentProduct != null) {
            return $currentProduct->getId();
        }
    }
    public function getProductUrl() {
        return $this->getCurrentProduct()->getProductUrl();
    }
    public function isDesignAble() {
        $flag = false;
        $productStatus = Mage::getModel('pdp/productstatus')->getProductStatus($this->getProductId());
        if ($productStatus == 1) {
            $flag = true;
        }
        return $flag;
    }
    public function getPdpDesignInfo() {
        $response = array();
        $response['action'] = $this->_currentAction;
        $response['share_id'] = $this->_shareId;
        $response['cart_item_id'] = '';
        $response['wishlist_item_id'] = '';
        $response['extra_options'] = '';

        $moduleName = Mage::app()->getRequest()->getModuleName();
        if (Mage::app()->getRequest()->getActionName() == "configure") {
            if ($moduleName == "checkout") {
                $itemCartId = $this->_params['id'];
                $response['cart_item_id'] = $itemCartId;
                $cart = Mage::getModel('checkout/cart')->getQuote();
                $item = $cart->getItemById($itemCartId);
                $buyRequest = $item->getBuyRequest()->getData();
                if (isset($buyRequest['extra_options'])) {
                    $response['extra_options'] = $buyRequest['extra_options'];
                }
            } else if ($moduleName == "wishlist") {
                $itemWishlistId = $this->_params['id'];
                $response['wishlist_item_id'] = $itemWishlistId;
                $wishlist = Mage::getModel('wishlist/item_option');
                $item = $wishlist->load($itemWishlistId);
                $optionValue = $item->getValue();
                $buyRequest = unserialize($optionValue);
                if (isset($buyRequest['extra_options'])) {
                    $response['extra_options'] = $buyRequest['extra_options'];
                }
            }

        }
        return $response;
    }
}