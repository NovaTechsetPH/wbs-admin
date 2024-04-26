<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => ['required', 'email', 'unique:employees,email'],
            'name' => ['required', 'string'],
            'employee_id' => ['required', 'unique:employees,employee_id'],
            'position_id' => ['required', 'exists:positions,id'],
            'type' => ['in:user,admin']
        ];
    }
}
