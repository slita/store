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
	public function index( )
	{
		//$this->load->view('welcome_message');
	
		echo 'foo-bar-index';
	}
	public function per($foo='bar')
	{
	/*	$this->load->view('welcome_message');*/
		
		
		$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

		echo 'foo:', json_encode($arr);
	}	
	
	public function sql($foo='bar')
	{
 
		$this->load->database();
		
		$query = $this->db->query('SELECT * FROM Persons');
		
		foreach ($query->result() as $row)
		{
		        echo $row->persons_id;
		        echo $row->FirstName;
		        echo $row->LastName;
		        echo $row->Address;
		        echo $row->City;
		        echo '<br/>';

		}
		
		echo 'Total Results: ' . $query->num_rows();

	}		
	public function persons($foo='bar')
	{
 
		$this->load->model('persons_model','',TRUE);
		
		$query = $this->persons_model->get_all_persons();
		//echo 'foo:'. json_encode($query);
		
		foreach ($query as $row)
		{
		        echo $row->persons_id;
		        echo $row->FirstName;
		        echo $row->LastName;
		        echo $row->Address;
		        echo $row->City;
		        echo '<br/>';
		}
	}		
	public function update_persons()
	{
 
 echo $_POST;
 
		$this->load->model('persons_model','',TRUE);
		
		
		
		$this->persons_model->update_persons();
		//echo 'foo:'. json_encode($query);
		
/*		foreach ($query as $row)
		{
		        echo $row->persons_id;
		        echo $row->FirstName;
		        echo $row->LastName;
		        echo $row->Address;
		        echo $row->City;
		        echo '<br/>';
		}*/
	}
	
}
