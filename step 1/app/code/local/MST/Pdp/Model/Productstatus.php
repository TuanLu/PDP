<?php
/**
* Magento Support Team.
* @category   MST
* @package    MST_Pdp
* @version    2.0
* @author     Magebay Developer Team <info@magebay.com>
* @copyright  Copyright (c) 2009-2013 MAGEBAY.COM. (http://www.magebay.com)
*/
class MST_Pdp_Model_Productstatus extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('pdp/productstatus');
    }
	public function setProductStatus($data) {
		$id = NULL;
		$collection = $this->getCollection();
		$collection->addFieldToFilter('product_id', $data['product_id']);
		if ($collection->count() > 0) {
			$id = $collection->getFirstItem()->getId();
		}
		$this->setData($data)->setId($id)->save();
	}
	public function getProductStatus($productId) {
		$status = "";
		$collection = $this->getCollection();
		$collection->addFieldToFilter('product_id', $productId);
		if ($collection->count() > 0) {
			$status = $collection->getFirstItem()->getStatus();
		}
        //Check product has side to design or not
        $sideModel = Mage::getModel('pdp/pdpside')->getDesignSides($productId);
        $isPdpEnable = Mage::getStoreConfig('pdp/setting/enable');
        if (!$sideModel->count() || $isPdpEnable == 0) {
            $status = 0;
        }
		return $status;
	}
}