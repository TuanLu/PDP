<?php
class MST_Pdp_ViewController extends Mage_Core_Controller_Front_Action
{
	public function indexAction() {
		$this->loadLayout();
		$defaultTitle = Mage::getStoreConfig('pdp/setting/headertitle');
		$this->getLayout()->getBlock('head')->setTitle($defaultTitle);
        $this->renderLayout();
	}
    public function finalDesignAction()
    {
        $params = $this->getRequest()->getParams();
		$jsonString = Mage::helper('pdp')->getOrderItemString($params['order-id'], $params['item-id']);
		$block = $this->getLayout()->createBlock('core/template')->setTemplate('pdp/review/finaldesign.phtml')->setData('pdpdesign', $jsonString);
		$this->getResponse()->setBody($block->toHtml());
    }
    public function designAction() {
        $this->loadLayout();
        $this->getResponse()->setBody($this->getLayout()->getBlock('pdp_head')->toHtml());
        $this->renderLayout();
    }
	public function getDesignPageAction() {
		$this->loadLayout();
		$defaultTitle = Mage::getStoreConfig('pdp/setting/headertitle');
		$this->getLayout()->getBlock('head')->setTitle($defaultTitle);
        $this->renderLayout();
	}
	public function saveBeforeShareAction() {
		$postData = $this->getRequest()->getPost();
		$shareId = Mage::getModel('pdp/share')->saveShareData($postData);
		$response['url'] = $postData['url'] . "?share=$shareId"; 
		$this->getResponse()->setBody(json_encode($response));
	}
}