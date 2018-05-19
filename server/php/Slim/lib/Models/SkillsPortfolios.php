<?php
/**
 * SkillsPortfolios
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Model
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
namespace Models;

/*
 * SkillsPortfolios
*/
class SkillsPortfolios extends AppModel
{
    protected $table = 'skills_portfolios';
    public function portfolio()
    {
        return $this->belongsTo('Models\Portfolio', 'portfolio_id', 'id')->with('user', 'attachment');
    }
    public function skill()
    {
        return $this->belongsTo('Models\Skill', 'skill_id', 'id');
    }
}
