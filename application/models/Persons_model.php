<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Persons_model extends CI_Model {

        public $FirstName;
        public $LastName;

        public function get_all_persons()
        {
                $query = $this->db->get('Persons',10);
                return $query->result();
        }

        public function insert_persons()
        {
                $this->FirstName    = $_POST['FirstName']; // please read the below note
                $this->LastName  = $_POST['LastName'];
        
                $this->db->insert('persons', $this);
        }

        public function update_persons()
        {
                $this->FirstName    = $_POST['FirstName']; // please read the below note
                $this->LastName  = $_POST['LastName'];
                
                $this->db->update('persons', $this, array('persons_id' => $_POST['persons_id']));
        }

}