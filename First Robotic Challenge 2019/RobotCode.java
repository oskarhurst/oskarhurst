/*----------------------------------------------------------------------------*/
/* Copyright (c) 2017-2018 FIRST. All Rights Reserved.                    	*/
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                           	*/
/*----------------------------------------------------------------------------*/

package frc.robot;

import com.ctre.phoenix.motorcontrol.ControlMode;
import com.ctre.phoenix.motorcontrol.can.TalonSRX;
import com.ctre.phoenix.motorcontrol.can.VictorSPX;

import edu.wpi.cscore.UsbCamera;
import edu.wpi.first.vision.VisionThread;
import edu.wpi.first.wpilibj.CameraServer;
import edu.wpi.first.wpilibj.Encoder;
import edu.wpi.first.wpilibj.Joystick;
import edu.wpi.first.wpilibj.Servo;
import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;
import edu.wpi.first.wpilibj.DigitalInput;

public class Robot extends TimedRobot {

  private DigitalInput limitSwitch = new DigitalInput(8);
  private DigitalInput limitSwitch2 = new DigitalInput(9);
  //private DigitalInput induction = new DigitalInput(4);
  private VictorSPX right1 = new VictorSPX(1);
  private VictorSPX right2 = new VictorSPX(2);
  private VictorSPX left1 = new VictorSPX(4);
  private VictorSPX left2 = new VictorSPX(3);
  private VictorSPX arm1 = new VictorSPX(5);
  private VictorSPX arm2 = new VictorSPX(6);
  private TalonSRX scoop = new TalonSRX(7);
  private Joystick joy = new Joystick(0);
  private Joystick box = new Joystick(1);
  Servo hook = new Servo(0);

  Encoder sampleEncoder = new Encoder(6, 7, false, Encoder.EncodingType.k4X);

  private static final int Img_WIDTH = 720;
  private static final int Img_HEIGHT = 480;

  private VisionThread visionThread;
  private double centerX = 0.0;

  private final Object imgLock = new Object();

  double integral = 0;
  double previous_error = 0;
  double setpoint = 0;

  double rcw;

  int position;

  int armseekposition = -1;

  @Override
  public void disabledInit() {
	armseekposition = -1;
	rcw =0.0;
  }

  @Override
  public void robotInit() {

	UsbCamera camera = CameraServer.getInstance().startAutomaticCapture();
	camera.setResolution(Img_WIDTH, Img_HEIGHT);
	/*
 	* visionThread = new VisionThread(camera, new MyVisionPipeline(), pipeline -> {
 	* if (!pipeline.filterContoursOutput().isEmpty()) { Rect r =
 	* Imgproc.boundingRect(pipeline.filterContoursOutput().get(0)); synchronized
 	* (imgLock) { centerX = r.x + (r.width / 2); } } }); visionThread.start();
 	*
 	* drive = new RobotDrive(1, 2);
 	*/

	/*
 	* UsbCamera camera = CameraServer.getInstance().startAutomaticCapture();
 	* camera.setResolution(Img_WIDTH, Img_HEIGHT);
 	*
 	* val listener = new VisionRunner.Listener<MyVisionPipeline>(){
 	*
 	* };
 	*
 	* visionThread = new VisionThread(camera, new MyVisionPipeline(), pipeline -> {
 	* if (!pipeline.filterContoursOutput().isEmpty()) { Rect r =
 	* Imgproc.boundingRect(pipeline.filterContoursOutput().get(0)); synchronized
 	* (imgLock) { centerX = r.x + (r.width / 2); } } }); visionThread.start();
 	*
 	* drive = new RobotDrive(1, 2);
 	*/
	// CameraServer.getInstance().startAutomaticCapture(0);
	// http://roborio-7667-frc.local:1181/?action=stream
  }

  @Override
  public void autonomousInit() {
  }

  @Override
  public void robotPeriodic() {
	if (limitSwitch2.get()) {
  	sampleEncoder.reset();
	}

	SmartDashboard.putNumber("Seek Position", armseekposition);
	SmartDashboard.putNumber("Encoder Count", sampleEncoder.get());
 
  }

  @Override
  public void autonomousPeriodic() {
	/*
 	* double centerX;
 	*
 	* synchronized(imgLock) { centerX = this.centerX; } double turn = centerX -
 	* (Img_WIDTH / 2); drive.arcadeDrive(-0.6, turn * 0.05);
 	*/
	/*
 	* switch (m_autoSelected) { case kCustomAuto: // Put custom auto code here
 	* break; case kDefaultAuto: default: // Put default auto code here break; }
 	*/
  }

  /**
   * This function is called periodically during operator control.
   */
  @Override
  public void teleopPeriodic() {

	// UsbCamera camera = CameraServer.getInstance().startAutomaticCapture();

	double left = joy.getRawAxis(1);
	double right = joy.getRawAxis(5);
	double arm = box.getRawAxis(1);
	boolean scoopin = box.getRawButton(7);
	boolean scoopout = box.getRawButton(8);
	double numleft;
	double numright;

	if (joy.getRawButton(1)) {
  	hook.setAngle(180);
	}
	if (joy.getRawButton(2)) {
  	hook.setAngle(0);
	}

	if (box.getRawButton(1) && !box.getRawButton(11) && !box.getRawButton(12)) {
  	armseekposition = 750;
	} else if (box.getRawButton(1) && box.getRawButton(11)) {
  	armseekposition = 700;
	} else if (box.getRawButton(1) && box.getRawButton(12)) {
  	armseekposition = 700;
	} else if (box.getRawButton(2)) {
  	armseekposition = 510;
	} else if (box.getRawButton(3)) {
  	armseekposition = 360;
	} else if (box.getRawButton(4)) {
  	armseekposition = 0;
	} else if (arm > 0.5) {
  	armseekposition = armseekposition + 1;
	} else if (arm < -0.5) {
  	armseekposition = armseekposition - 1;
	}
	if (armseekposition >= 0) {
  	PID(armseekposition);
	}

	/*
 	* double distance = sampleEncoder.getRaw(); double distance2 =
 	* sampleEncoder.getDistance(); double period = sampleEncoder.getPeriod();
 	* double rate = sampleEncoder.getRate(); boolean direction =
 	* sampleEncoder.getDirection(); boolean stopped = sampleEncoder.getStopped();
 	*/
	if (left > 0.0) {
  	numleft = Math.pow(left, 2.0);
	} else {
  	numleft = -Math.pow(left, 2.0);
	}

	if (right > 0.0) {
  	numright = Math.pow(right, 2.0);
	} else {
  	numright = -Math.pow(right, 2.0);
	}
	if (joy.getRawAxis(2) != 0) {
  	left1.set(ControlMode.PercentOutput, 0.5);
  	left2.set(ControlMode.PercentOutput, 0.5);
  	right1.set(ControlMode.PercentOutput, -0.5);
  	right2.set(ControlMode.PercentOutput, -0.5);
	} else if (joy.getRawAxis(3) != 0) {
  	left1.set(ControlMode.PercentOutput, -0.5);
  	left2.set(ControlMode.PercentOutput, -0.5);
  	right1.set(ControlMode.PercentOutput, 0.5);
  	right2.set(ControlMode.PercentOutput, 0.5);
	} else if (joy.getRawButton(5)) {
  	left1.set(ControlMode.PercentOutput, -0.5);
  	left2.set(ControlMode.PercentOutput, -0.5);
  	right1.set(ControlMode.PercentOutput, -0.5);
  	right2.set(ControlMode.PercentOutput, -0.5);
	} else if (joy.getRawButton(6)) {
  	left1.set(ControlMode.PercentOutput, 0.5);
  	left2.set(ControlMode.PercentOutput, 0.5);
  	right1.set(ControlMode.PercentOutput, 0.5);
  	right2.set(ControlMode.PercentOutput, 0.5);
	} else {
  	left1.set(ControlMode.PercentOutput, -numleft);
  	left2.set(ControlMode.PercentOutput, -numleft);
  	right1.set(ControlMode.PercentOutput, numright);
  	right2.set(ControlMode.PercentOutput, numright);
	}

	if (scoopout == true) {
  	scoop.set(ControlMode.PercentOutput, 1.0);
	} else if (scoopin == true && limitSwitch.get() != true) {
  	scoop.set(ControlMode.PercentOutput, -1.0);
	}

	else if (limitSwitch.get() == true) {
  	scoop.set(ControlMode.PercentOutput, -0.2);
	} else {
  	scoop.set(ControlMode.PercentOutput, 0.0);
	}

  }

  /**
   * This function is called periodically during test mode.
   */
  @Override
  public void testPeriodic() {
  }

  public void PID(int position) {
	double P = 0.035;
	double I = 0.002;
	double D = 0.005;

	double count = sampleEncoder.get();

	double error = -position - count;

	integral = integral + (error * 0.02 * I);

	double derivative = (error - previous_error) / .02;

	double rcw = P * error + integral + D * derivative;

	SmartDashboard.putNumber("MotorPower", rcw);

	previous_error = error;
	if (Math.abs(error) > 5) {
  	arm1.set(ControlMode.PercentOutput, rcw / 10.0);
  	arm2.set(ControlMode.PercentOutput, rcw / 10.0);
	}
  }

}
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About

