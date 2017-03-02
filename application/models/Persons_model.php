<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Persons_model extends CI_Model {

        public $first_name;
        public $last_name;
        public $username;
        public $email;
        public $psw;
        
        
	function signed_in($method='check'){
		
		/**
		 *   Param:
		 *   method = 'check' - Returns only boolean TRUE or FALSE
		 *   medhod = 'user'  - Returns $row from person or FALSE
		 * 
		 */
		
		// get cokie
		$this->load->helper('cookie');
                $cookie = get_cookie('TheStore');
                
		
		if (!isset($cookie)){
		        log_message('debug','no cookie');  
                        return FALSE;

		}
		
		// get person
		$row = $this->get_one_person($cookie);
		if (isset($row)){
		        
		    if (!$row->signed_in){ 
		        log_message('debug','not signed in');  
                        return FALSE;
		    }   
		      
		    if ($method === 'check'){
		        log_message('debug','user ok:'. TRUE);   
	                return TRUE;
		    } else {
                        log_message('debug','user ok row:');		            
                        return $row;		                     
		    }
		    
		}
		log_message('debug','no user'); 
	        return FALSE;	
	}

        function get_all_persons()
        {
                $query = $this->db->get('person',10);
                return $query->result();
        }
        function get_one_person($id)
        {
                $this->db->where('person_id', $id);
                $query = $this->db->get('person');
                $row = $query->row();

                // nollställ psw
                $row->psw = null; 
                
                if (isset($row))
                {
                        return $row;
                }
                

        }
        function insert_person()
        {

                $_POST = json_decode($this->input->raw_input_stream, true);

                $this->first_name = $this->input->post('first_name'); 
                $this->last_name  = $this->input->post('last_name'); 
                $this->username   = $this->input->post('username'); 
                $this->email      = $this->input->post('email'); 
                
                $this->psw        = $this->password_hash(); 
                
                
        
                $this->db->insert('person', $this);
                return  $this->db->insert_id();
        }

        function update_person($id=null)
        {

                // alternativ 1
                // $_POST = json_decode($this->input->raw_input_stream, TRUE);
                // $data = $this->input->post(array('first_name','last_name','email'));
                // $this->db->update('person', $data, array('person_id' => $id));

                // alternativ 2
/*                $this->load->helper('array');
                $raw_data = json_decode($this->input->raw_input_stream, TRUE);
                $data = elements(array('first_name','last_name','email'), $raw_data);
                $this->db->update('person', $data, array('person_id' => $id));*/
                
                // alternativ 4
                $this->load->helper('array');
                $raw_data = json_decode($this->input->raw_input_stream, TRUE);
                $data = elements(array('first_name','last_name','email'), $raw_data);            
                
                $this->db->set($data);
                $this->db->where('person_id', $id);
                $this->db->update('person');


/*                
                alternativet 3
                $_POST = json_decode($this->input->raw_input_stream, TRUE);

                $this->first_name = $this->input->post('first_name'); 
                $this->last_name  = $this->input->post('last_name'); 
                $this->email      = $this->input->post('email'); 
                $this->db->update('person', $this, array('person_id' => $id));*/

        }
        function delete_person($id)
        {
                $this->db->delete('person', array('person_id' => $id));  
        }
        
        function password_hash()
        {
                
                $psw = $this->input->post('psw');
                $psw_bcrypt = password_hash($psw, PASSWORD_DEFAULT);
                return $psw_bcrypt;
                
        }

        function login()
        {
                // POST
                $_POST      = json_decode($this->input->raw_input_stream, true);
                $username   = $this->input->post('username');
                $psw        = $this->input->post('psw');
                
                // DATABASE
                $this->db->where('username', $username);
                $query = $this->db->get('person');
                $row = $query->row();


                // CHECK
                if (isset($row))
                {
                        // Check psw
                        if (password_verify($psw , $row->psw)) {
                                // echo 'Password is valid!';
                                
                                // update signed_in
                                $data = array('signed_in' => TRUE);
                                $this->db->where('person_id', $row->person_id);
                                $this->db->update('person', $data);
                                // set cokie
                                $this->set_cookie($row->person_id);
                                return $row;
                                        
                        } else {
                                // echo 'Invalid password.';
                                //http_response_code(401);
                                $this->output->set_status_header(401);
                                return array('message' => 'error');
                        }
                } else {
                        // echo 'Invalid username.';
                        //http_response_code(401);
                        $this->output->set_status_header(401);
                        return array('message' => 'error');
                }
                
        }
	function logout($person_id=null){


		$this->load->helper('cookie');
                delete_cookie('TheStore');
                
		$data = array('signed_in' => FALSE);
                $this->db->where('person_id',$person_id);
                $this->db->update('person', $data);
		
	        return 'ok';
	}
        function set_cookie($person_id){
                
                $this->load->helper('cookie');
                $cookie = array(
                        'name'   => 'TheStore',
                        'value'  => $person_id,
                        'expire' => '86500');  
                set_cookie($cookie);       
                //$this->input->set_cookie($cookie);
        }

}