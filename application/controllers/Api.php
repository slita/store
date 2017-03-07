<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	
	
	
	public function __construct()
    {
    	parent::__construct();
        
        
        $this->load->model('persons_model','',TRUE);
        $this->load->model('store_model','',TRUE);
        $this->load->model('item_model','',TRUE);

    }
	
	/**
	 * index.pgp/api/update_item/user/nn/store/nn/item/nn
	 * 
	 */ 
	
	
/*	public function update_item(
		$person_kd=NULL,
		$person_id=NULL,
		$store_kd=NULL,
		$store_id=NULL,
		$item_kd=NULL,
		$item_id=NULL)
	{
 		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$this->persons_model->update_person($id);

	}*/
	
	public function index( )
	{

		
	}
	public function per($foo='bar')
	{

		
		
		$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

		echo 'foo:', json_encode($arr);
	}
	
	/** Person */
	
	public function signed_in()
	{
		$row = $this->persons_model->signed_in('user');
		

		if (is_object($row)) {
			echo json_encode($row);
		} else {
			echo NULL;
		}

	}
	public function persons()
	{
 
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}
		
		$this->persons_model->signed_in();
		
		$query = $this->persons_model->get_all_persons();
		echo json_encode($query);

	}		
	public function update_person($id=null)
	{
 		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$this->persons_model->update_person($id);

	}
	public function insert_person()
	{
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$id = $this->persons_model->insert_person();

	}
	public function delete_person($id)
	{
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$this->persons_model->delete_person($id);

	}
	public function get_one_person($id)
	{

		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$row = $this->persons_model->get_one_person($id);
		echo json_encode($row);

	}
	public function login ()
	{
		
		$logged_in = $this->persons_model->login();
		echo json_encode($logged_in);
		
	}		
	public function logout ($person_id=null)
	{
		
		$this->persons_model->logout($person_id);

	}	
	
	/** Store and Items */
	
	/**
	 * Get one store
	 * @param {integer} $id - Sore id
	 * @return {object} All information about the store
	 * 
	 */
	
	public function get_one_store($id)
	{

		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$row = $this->store_model->get_one_store($id);
		echo json_encode($row);

	}
	
	/**
	 * Insert a store
	 * 
	 * @data {object} POST Item data, json
	 * @return {integer} Id for the store 
	 * 
	 */
	
	public function insert_store()
	{
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$id = $this->store_model->insert_store();

		echo json_encode($id);
	}
	public function insert_item()
	{
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		$id = $this->item_model->insert_item();

		echo json_encode($id);
	}
	public function insert_store_item($store_id)
	{
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}

		if ($store_id == 0) {

			$store_id = $this->store_model->insert_store();
		} 

		$id = $this->item_model->insert_item($store_id);

		echo json_encode($id);
	}
	public function items($person_id)
	{
 
		if ( ! $this->persons_model->signed_in()){die('HTTP Error 401 Unauthorized');}
		
		
		$query = $this->store_model->get_all_item_from_store($person_id);
		
		echo json_encode($query);

	}
	
}
