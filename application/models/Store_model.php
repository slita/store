<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Store_model extends CI_Model {
        

        function get_all_store()
        {
                $query = $this->db->get('store',10);
                return $query->result();
        }
        function get_one_store($id)
        {

                $this->db->where('person_id', $id);
                $query = $this->db->get('store');
                $row = $query->row();

                if (isset($row))
                {
                        return $row;
                }
                
                return "no-store";

        }
        function insert_store()
        {


                $this->load->helper('array');
                $raw_data = json_decode($this->input->raw_input_stream, TRUE);
                $data = elements(array('store_name','person_id'), $raw_data);            
                
                $this->db->set($data);
                $this->db->insert('store');
                return  $this->db->insert_id();
                
        }
        
        /**
         * Update one store
         * @param {integer} id - Id for the store
         */
        function update_store($id=null)
        {

                $this->load->helper('array');
                $raw_data = json_decode($this->input->raw_input_stream, TRUE);
                $data = elements(array('store_name'), $raw_data);            
                
                $this->db->set($data);
                $this->db->where('store_id', $id);
                $this->db->update('store');

        }
        function delete_store($id)
        {
                $this->db->where('store_id', $id);
                $this->db->delete('store');  
        }
        
}