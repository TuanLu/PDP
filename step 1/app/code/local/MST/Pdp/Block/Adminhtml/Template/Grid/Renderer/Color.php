<?php
class MST_PDP_Block_Adminhtml_Template_Grid_Renderer_Color extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Action {
    public function render(Varien_Object $row)
    {
        return $this->_getValue($row);
    }
	public function _getValue(Varien_Object $row)
    {
        if ($getter = $this->getColumn()->getGetter()) {
            $val = $row->$getter();
        }
        $val = $row->getData($this->getColumn()->getIndex());
        $val = str_replace("no_selection", "", $val);

        $out = '<center><span style="background: #'.$val.'; padding: 0px 50px; border: 1px solid #CCCCCC;"></span></center>';

        return $out;

    }
}