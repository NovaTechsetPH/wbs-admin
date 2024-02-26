<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Employee;

class ActiveStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:active-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    private function getActiveStatus($increment)
    {
        if ($increment == 0)
            return 'Offline';

        if ($increment <= 240)
            return 'Active';

        // waiting = inactive for 4 minutes            
        if ($increment <= 480)
            return 'Waiting';

        // away = inactive for 10 minutes
        if ($increment <= 600)
            return 'Away';

        return 'Offline';
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting active status check...');
        \Log::info('Active status check started...');
        $ref = Employee::select('id', 'incremented', 'employee_id')
            ->whereNot('active_status', 'Offline')
            ->where('incremented', '>', 60)
            ->get();

        sleep(10);
        foreach ($ref as $key) {
            if ($key->id == 20 && $key->employee_id == 'Kenneth') {
                $key->employee_id = 'PH0067';
                $key->save();
                continue;
            }

            $current = Employee::find($key->id);
            $increment = $current->incremented - $key->incremented;
            $status = $this->getActiveStatus($increment);

            if ($key->incremented == $current->incremented) {
                \Log::info("$status: " . $current->first_name . ' ' . $current->last_name . ', ' . 'increment: ' . $increment);
                $current->active_status = $status;
                $current->incremented = $increment != 0 ? $current->incremented : 0;
                $current->save();
            }
        }
    }
}
