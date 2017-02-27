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
        
		
        
    }
	

	
	public function index( )
	{

		
	}
	
	public function per($foo='bar')
	{

		
		
		$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

		echo 'foo:', json_encode($arr);
	}
	public function signed_in(){
		$row = $this->persons_model->signed_in('user');
		

		if (is_object($row)) {
			echo json_encode($row);
		} else {
			echo NULL;
		}

	}
	
	public function persons()
	{
 
		$this->persons_model->signed_in();
		
		$query = $this->persons_model->get_all_persons();
		echo json_encode($query);

	}		
	public function update_person()
	{
 		

		$this->persons_model->update_person();

	}
	public function insert_person()
	{
	

		$id = $this->persons_model->insert_person();

	}
	public function delete_person($id)
	{


		$this->persons_model->delete_person($id);

	}
	public function get_one_person($id)
	{


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
}
