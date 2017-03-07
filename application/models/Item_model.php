<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Item_model extends CI_Model {
        

        function get_all_item()
        {
                $query = $this->db->get('item',10);
                return $query->result();
        }
        function get_one_item($id)
        {
                $this->db->where('item_id', $id);
                $query = $this->db->get('item');
                $row = $query->row();

                if (isset($row))
                {
                        return $row;
                }
                
        }
        function insert_item($store_id)
        {

                $this->load->helper('array');
                $raw_data = json_decode($this->input->raw_input_stream, TRUE);
                $data = elements(array('store_id','item_name','item_id','item_desc'), $raw_data);  
                
                $data['store_id'] = $store_id;
                
                
                $this->db->set($data);
                $this->db->insert('item');
                return  $this->db->insert_id();
                
        }
        
        /**
         * Update one store
         * @param {integer} id - Id for the store
         */
        function update_item($id=null)
        {

                $this->load->helper('array');
                $raw_data = json_decode($this->input->raw_input_stream, TRUE);
                $data = elements(array('item_name'), $raw_data);            
                
                $this->db->set($data);
                $this->db->where('item_id', $id);
                $this->db->update('item');

        }
        function delete_item($id)
        {
                $this->db->where('item_id', $id);
                $this->db->delete('item');  
        }
        
        
}